const express = require('express');
const { body, validationResult, query } = require('express-validator');
const { executeQuery, findOne } = require('../config/database');

const router = express.Router();

// Get all plots for a user
router.get('/', [
  query('userId').isInt().toInt()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userId } = req.query;

    const result = await executeQuery(`
      SELECT 
        lp.*,
        c.name as community_name,
        p.name as province_name,
        r.name as region_name
      FROM land_plots lp
      JOIN communities c ON lp.community_id = c.id
      JOIN provinces p ON c.province_id = p.id
      JOIN regions r ON p.region_id = r.id
      WHERE lp.user_id = ?
      ORDER BY lp.created_at DESC
    `, [userId]);

    if (result.success) {
      res.json({
        success: true,
        data: result.data
      });
    } else {
      res.status(500).json({ error: 'Failed to fetch plots' });
    }

  } catch (error) {
    console.error('Get plots error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single plot
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await findOne(`
      SELECT 
        lp.*,
        c.name as community_name,
        p.name as province_name,
        r.name as region_name
      FROM land_plots lp
      JOIN communities c ON lp.community_id = c.id
      JOIN provinces p ON c.province_id = p.id
      JOIN regions r ON p.region_id = r.id
      WHERE lp.id = ?
    `, [id]);

    if (result.success && result.data) {
      res.json({
        success: true,
        data: result.data
      });
    } else {
      res.status(404).json({ error: 'Plot not found' });
    }

  } catch (error) {
    console.error('Get plot error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new plot
router.post('/', [
  body('userId').isInt(),
  body('communityId').isInt(),
  body('sheetNumber').notEmpty().trim(),
  body('blockNumber').notEmpty().trim(),
  body('plotNumber').notEmpty().trim(),
  body('totalArea').isFloat({ min: 0 }),
  body('cultivableArea').isFloat({ min: 0 }),
  body('irrigationMethod').isIn(['drip', 'sprinkler', 'furrow', 'none']),
  body('ownershipType').isIn(['owned', 'rented', 'shared']),
  body('registrationDate').isISO8601()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      userId,
      communityId,
      sheetNumber,
      blockNumber,
      plotNumber,
      totalArea,
      cultivableArea,
      irrigationMethod,
      soilType,
      slope,
      ownershipType,
      registrationDate,
      coordinatesLat,
      coordinatesLng,
      notes
    } = req.body;

    // Check if plot already exists
    const existingPlot = await findOne(
      'SELECT id FROM land_plots WHERE sheet_number = ? AND block_number = ? AND plot_number = ?',
      [sheetNumber, blockNumber, plotNumber]
    );

    if (existingPlot.success && existingPlot.data) {
      return res.status(409).json({ error: 'Plot with these coordinates already exists' });
    }

    const result = await executeQuery(`
      INSERT INTO land_plots (
        user_id, community_id, sheet_number, block_number, plot_number,
        total_area, cultivable_area, irrigation_method, soil_type, slope,
        ownership_type, registration_date, coordinates_lat, coordinates_lng, notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      userId, communityId, sheetNumber, blockNumber, plotNumber,
      totalArea, cultivableArea, irrigationMethod, soilType, slope,
      ownershipType, registrationDate, coordinatesLat, coordinatesLng, notes
    ]);

    if (result.success) {
      res.status(201).json({
        success: true,
        message: 'Plot created successfully',
        data: { id: result.data.insertId }
      });
    } else {
      res.status(500).json({ error: 'Failed to create plot' });
    }

  } catch (error) {
    console.error('Create plot error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update plot
router.put('/:id', [
  body('totalArea').optional().isFloat({ min: 0 }),
  body('cultivableArea').optional().isFloat({ min: 0 }),
  body('irrigationMethod').optional().isIn(['drip', 'sprinkler', 'furrow', 'none']),
  body('ownershipType').optional().isIn(['owned', 'rented', 'shared']),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const updateFields = [];
    const updateValues = [];

    // Build dynamic update query
    Object.keys(req.body).forEach(key => {
      const dbField = key.replace(/([A-Z])/g, '_$1').toLowerCase();
      updateFields.push(`${dbField} = ?`);
      updateValues.push(req.body[key]);
    });

    if (updateFields.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    updateValues.push(id);

    const result = await executeQuery(`
      UPDATE land_plots 
      SET ${updateFields.join(', ')}, updated_at = NOW()
      WHERE id = ?
    `, updateValues);

    if (result.success) {
      res.json({
        success: true,
        message: 'Plot updated successfully'
      });
    } else {
      res.status(500).json({ error: 'Failed to update plot' });
    }

  } catch (error) {
    console.error('Update plot error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete plot
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await executeQuery(
      'DELETE FROM land_plots WHERE id = ?',
      [id]
    );

    if (result.success) {
      res.json({
        success: true,
        message: 'Plot deleted successfully'
      });
    } else {
      res.status(500).json({ error: 'Failed to delete plot' });
    }

  } catch (error) {
    console.error('Delete plot error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get communities for dropdown
router.get('/meta/communities', async (req, res) => {
  try {
    const result = await executeQuery(`
      SELECT 
        c.id, c.name, c.code,
        p.name as province_name,
        r.name as region_name
      FROM communities c
      JOIN provinces p ON c.province_id = p.id
      JOIN regions r ON p.region_id = r.id
      ORDER BY r.name, p.name, c.name
    `);

    if (result.success) {
      res.json({
        success: true,
        data: result.data
      });
    } else {
      res.status(500).json({ error: 'Failed to fetch communities' });
    }

  } catch (error) {
    console.error('Get communities error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
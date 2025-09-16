const express = require('express');
const { body, validationResult, query } = require('express-validator');
const { executeQuery, findOne } = require('../config/database');

const router = express.Router();

// Get cultivation declarations for a user
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
        cd.*,
        lp.sheet_number,
        lp.block_number,
        lp.plot_number,
        c.name as community_name,
        cg.name as cultivation_group_name,
        cult.name as cultivation_name,
        v.name as variety_name
      FROM cultivation_declarations cd
      JOIN land_plots lp ON cd.land_plot_id = lp.id
      JOIN communities c ON lp.community_id = c.id
      LEFT JOIN cultivation_groups cg ON cd.cultivation_group_id = cg.id
      LEFT JOIN cultivations cult ON cd.cultivation_id = cult.id
      LEFT JOIN varieties v ON cd.variety_id = v.id
      WHERE cd.user_id = ?
      ORDER BY cd.created_at DESC
    `, [userId]);

    if (result.success) {
      res.json({
        success: true,
        data: result.data
      });
    } else {
      res.status(500).json({ error: 'Failed to fetch declarations' });
    }

  } catch (error) {
    console.error('Get declarations error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single declaration
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await findOne(`
      SELECT 
        cd.*,
        lp.sheet_number,
        lp.block_number,
        lp.plot_number,
        lp.total_area as plot_total_area,
        c.name as community_name,
        p.name as province_name,
        cg.name as cultivation_group_name,
        cult.name as cultivation_name,
        v.name as variety_name
      FROM cultivation_declarations cd
      JOIN land_plots lp ON cd.land_plot_id = lp.id
      JOIN communities c ON lp.community_id = c.id
      JOIN provinces p ON c.province_id = p.id
      LEFT JOIN cultivation_groups cg ON cd.cultivation_group_id = cg.id
      LEFT JOIN cultivations cult ON cd.cultivation_id = cult.id
      LEFT JOIN varieties v ON cd.variety_id = v.id
      WHERE cd.id = ?
    `, [id]);

    if (result.success && result.data) {
      res.json({
        success: true,
        data: result.data
      });
    } else {
      res.status(404).json({ error: 'Declaration not found' });
    }

  } catch (error) {
    console.error('Get declaration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new cultivation declaration
router.post('/', [
  body('userId').isInt(),
  body('landPlotId').isInt(),
  body('cultivationGroupId').optional().isInt(),
  body('cultivationId').optional().isInt(),
  body('varietyId').optional().isInt(),
  body('cultivationType').isIn(['seasonal', 'permanent']),
  body('plantingDate').isISO8601(),
  body('cultivatedArea').isFloat({ min: 0 }),
  body('numberOfTrees').optional().isInt({ min: 0 }),
  body('irrigationMethod').isIn(['drip', 'sprinkler', 'furrow', 'none']),
  body('organicCertified').isBoolean()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      userId,
      landPlotId,
      cultivationGroupId,
      cultivationId,
      varietyId,
      cultivationType,
      plantingDate,
      cultivatedArea,
      numberOfTrees,
      irrigationMethod,
      organicCertified,
      notes
    } = req.body;

    // Check if plot belongs to user
    const plotCheck = await findOne(
      'SELECT id FROM land_plots WHERE id = ? AND user_id = ?',
      [landPlotId, userId]
    );

    if (!plotCheck.success || !plotCheck.data) {
      return res.status(403).json({ error: 'Plot does not belong to user' });
    }

    // Check if late submission (for permanent crops)
    const isLateSubmission = cultivationType === 'permanent' && 
      new Date() - new Date(plantingDate) > 21 * 24 * 60 * 60 * 1000;

    const result = await executeQuery(`
      INSERT INTO cultivation_declarations (
        user_id, land_plot_id, cultivation_group_id, cultivation_id, variety_id,
        cultivation_type, planting_date, cultivated_area, number_of_trees,
        irrigation_method, organic_certified, is_late_submission, notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      userId, landPlotId, cultivationGroupId, cultivationId, varietyId,
      cultivationType, plantingDate, cultivatedArea, numberOfTrees,
      irrigationMethod, organicCertified, isLateSubmission, notes
    ]);

    if (result.success) {
      res.status(201).json({
        success: true,
        message: 'Declaration created successfully',
        data: { 
          id: result.data.insertId,
          isLateSubmission 
        }
      });
    } else {
      res.status(500).json({ error: 'Failed to create declaration' });
    }

  } catch (error) {
    console.error('Create declaration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update declaration status
router.patch('/:id/status', [
  body('status').isIn(['draft', 'submitted', 'approved', 'rejected'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { status } = req.body;

    const result = await executeQuery(
      'UPDATE cultivation_declarations SET status = ?, updated_at = NOW() WHERE id = ?',
      [status, id]
    );

    if (result.success) {
      res.json({
        success: true,
        message: 'Declaration status updated successfully'
      });
    } else {
      res.status(500).json({ error: 'Failed to update declaration status' });
    }

  } catch (error) {
    console.error('Update declaration status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get active declarations (for damage declaration eligibility)
router.get('/active/by-plot/:plotId', async (req, res) => {
  try {
    const { plotId } = req.params;

    const result = await executeQuery(`
      SELECT 
        cd.*,
        cg.name as cultivation_group_name,
        cult.name as cultivation_name,
        v.name as variety_name
      FROM cultivation_declarations cd
      LEFT JOIN cultivation_groups cg ON cd.cultivation_group_id = cg.id
      LEFT JOIN cultivations cult ON cd.cultivation_id = cult.id
      LEFT JOIN varieties v ON cd.variety_id = v.id
      WHERE cd.land_plot_id = ? 
        AND cd.status = 'approved'
        AND cd.planting_date <= CURDATE()
      ORDER BY cd.planting_date DESC
    `, [plotId]);

    if (result.success) {
      res.json({
        success: true,
        data: result.data
      });
    } else {
      res.status(500).json({ error: 'Failed to fetch active declarations' });
    }

  } catch (error) {
    console.error('Get active declarations error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
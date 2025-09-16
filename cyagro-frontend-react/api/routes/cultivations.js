const express = require('express');
const { body, validationResult, query } = require('express-validator');
const { executeQuery, findOne } = require('../config/database');

const router = express.Router();

// Get cultivation groups, cultivations and varieties
router.get('/groups', async (req, res) => {
  try {
    const result = await executeQuery(`
      SELECT 
        cg.id,
        cg.name,
        cg.description,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', c.id,
            'name', c.name,
            'description', c.description,
            'varieties', c.varieties
          )
        ) as cultivations
      FROM cultivation_groups cg
      LEFT JOIN (
        SELECT 
          c.*,
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'id', v.id,
              'name', v.name,
              'description', v.description
            )
          ) as varieties
        FROM cultivations c
        LEFT JOIN varieties v ON c.id = v.cultivation_id
        GROUP BY c.id
      ) c ON cg.id = c.cultivation_group_id
      GROUP BY cg.id
      ORDER BY cg.name
    `);

    if (result.success) {
      res.json({
        success: true,
        data: result.data
      });
    } else {
      res.status(500).json({ error: 'Failed to fetch cultivation data' });
    }

  } catch (error) {
    console.error('Get cultivation groups error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get cultivations by group
router.get('/groups/:groupId/cultivations', async (req, res) => {
  try {
    const { groupId } = req.params;

    const result = await executeQuery(`
      SELECT 
        c.*,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', v.id,
            'name', v.name,
            'description', v.description
          )
        ) as varieties
      FROM cultivations c
      LEFT JOIN varieties v ON c.id = v.cultivation_id
      WHERE c.cultivation_group_id = ?
      GROUP BY c.id
      ORDER BY c.name
    `, [groupId]);

    if (result.success) {
      res.json({
        success: true,
        data: result.data
      });
    } else {
      res.status(500).json({ error: 'Failed to fetch cultivations' });
    }

  } catch (error) {
    console.error('Get cultivations error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get varieties by cultivation
router.get('/cultivations/:cultivationId/varieties', async (req, res) => {
  try {
    const { cultivationId } = req.params;

    const result = await executeQuery(
      'SELECT * FROM varieties WHERE cultivation_id = ? ORDER BY name',
      [cultivationId]
    );

    if (result.success) {
      res.json({
        success: true,
        data: result.data
      });
    } else {
      res.status(500).json({ error: 'Failed to fetch varieties' });
    }

  } catch (error) {
    console.error('Get varieties error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Simple endpoints for dropdowns
router.get('/simple/groups', async (req, res) => {
  try {
    const result = await executeQuery(
      'SELECT id, name, description FROM cultivation_groups ORDER BY name'
    );

    if (result.success) {
      res.json({
        success: true,
        data: result.data
      });
    } else {
      res.status(500).json({ error: 'Failed to fetch cultivation groups' });
    }

  } catch (error) {
    console.error('Get cultivation groups error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/simple/cultivations', [
  query('groupId').optional().isInt()
], async (req, res) => {
  try {
    const { groupId } = req.query;
    
    let query = 'SELECT id, name, description, cultivation_group_id FROM cultivations';
    let params = [];
    
    if (groupId) {
      query += ' WHERE cultivation_group_id = ?';
      params.push(groupId);
    }
    
    query += ' ORDER BY name';

    const result = await executeQuery(query, params);

    if (result.success) {
      res.json({
        success: true,
        data: result.data
      });
    } else {
      res.status(500).json({ error: 'Failed to fetch cultivations' });
    }

  } catch (error) {
    console.error('Get cultivations error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/simple/varieties', [
  query('cultivationId').optional().isInt()
], async (req, res) => {
  try {
    const { cultivationId } = req.query;
    
    let query = 'SELECT id, name, description, cultivation_id FROM varieties';
    let params = [];
    
    if (cultivationId) {
      query += ' WHERE cultivation_id = ?';
      params.push(cultivationId);
    }
    
    query += ' ORDER BY name';

    const result = await executeQuery(query, params);

    if (result.success) {
      res.json({
        success: true,
        data: result.data
      });
    } else {
      res.status(500).json({ error: 'Failed to fetch varieties' });
    }

  } catch (error) {
    console.error('Get varieties error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
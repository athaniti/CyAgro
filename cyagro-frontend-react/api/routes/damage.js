const express = require('express');
const router = express.Router();

// Get damage declarations
router.get('/', async (req, res) => {
  res.json({ message: 'Damage declarations endpoint - To be implemented' });
});

// Create damage declaration
router.post('/', async (req, res) => {
  res.json({ message: 'Create damage declaration endpoint - To be implemented' });
});

// Get harmful causes
router.get('/causes', async (req, res) => {
  res.json({ message: 'Harmful causes endpoint - To be implemented' });
});

module.exports = router;
const express = require('express');
const router = express.Router();

// Upload document
router.post('/upload', async (req, res) => {
  res.json({ message: 'Document upload endpoint - To be implemented' });
});

// Get documents for entity
router.get('/', async (req, res) => {
  res.json({ message: 'Get documents endpoint - To be implemented' });
});

module.exports = router;
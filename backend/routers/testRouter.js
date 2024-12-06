const express = require('express');
const router = express.Router();
const { listTables } = require('../models/userModel');

router.get('/', (req, res) => {
  res.send('Hurray! Server is working');
});


router.get('/listtables', async (req, res) => {
  try {
    const tables = await listTables();
    res.status(200).json({ tables });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tables', details: error.message });
  }
});

module.exports = router;

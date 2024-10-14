const express = require('express');
const Popular = require('../models/Popular');
const User = require('../models/Users');
const { protect } = require('./auth');
const router = express.Router();

// Fetch all webtoons
router.get('/popular', async (req, res) => {
  try {
    const popular = await Popular.find();
    res.json(popular);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;

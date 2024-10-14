const express = require('express');
const Webtoon = require('../models/Webtoons');
const User = require('../models/Users');
const { protect } = require('./auth');
const router = express.Router();

// Fetch all webtoons
router.get('/webtoons', async (req, res) => {
  try {
    const webtoons = await Webtoon.find();
    res.json(webtoons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/webtoons/:id', async (req, res) => {
  try {
    const webtoon = await Webtoon.findById(req.params.id);
    if (!webtoon) {
      return res.status(404).json({ message: 'Webtoon not found' });
    }
    res.json(webtoon);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;

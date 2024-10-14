const express = require('express');
const Favourite = require('../models/Favourite');
const Webtoon = require('../models/Webtoons');
const router = express.Router();

// Add to favourite
router.post('/like', async (req, res) => {
  const { userId, webtoonId } = req.body;
  try {
    if (!userId || !webtoonId) {
      return res.status(400).json({ message: 'User ID and Webtoon ID are required.' });
    }

    const existingFavourite = await Favourite.findOne({ userId, webtoonId });
    
    if (existingFavourite) {
      return res.status(400).json({ message: 'You have already liked this webtoon.' });
    }

    const favourite = new Favourite({ userId, webtoonId });
    await favourite.save();

    res.status(200).json(favourite);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/details', async (req, res) => {
  try {
    const favourites = await Favourite.find().populate('webtoonId');  
    res.json(favourites);  
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;

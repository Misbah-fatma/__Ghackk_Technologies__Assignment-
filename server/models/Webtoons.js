const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: String, required: true },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const episodeSchema = new mongoose.Schema({
  episodeNumber: { type: Number, required: true },
  views: { type: Number, required: true },
  duration: { type: String, required: true }
});

const webtoonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: String, required: true },
  img: { type: String, required: true },
  category: { type: String, required: true },
  studio: { type: String, required: true },
  commentsCount: { type: Number, required: true },
  views: { type: String, required: true },
  episodes: [episodeSchema],
  reviews: [reviewSchema]
});

module.exports = mongoose.model('Webtoon', webtoonSchema);

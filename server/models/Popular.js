const mongoose = require('mongoose');

const PopularSchema = new mongoose.Schema({
  name: { type: String, required: true },
  Rating: { type: String, required: true },
  img: { type: String, required: true },
  category: { type: String, required: true },
  studio: { type: String, required: true },
  comment: { type: Number, required: true },
  views: { type: String, required: true },
  episodes: [{ text: Number}]
});

module.exports = mongoose.model('Popular', PopularSchema);
const mongoose = require('mongoose');

const FavouriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  webtoonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Webtoon', required: true },
  likedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Favourite', FavouriteSchema);

const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
  title: String,
  author: String,
  year: Number,
  imageUrl: String,
  likes: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Books', BookSchema);
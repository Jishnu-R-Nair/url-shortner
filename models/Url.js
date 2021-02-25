const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  urlCode: String,
  longUrl: String,
  shortUrl: String,
});

module.exports = mongoose.model('Url', schema);

var mongoose = require('mongoose');

var schema = mongoose.Schema({
  name: String,
  address: String,
  rating: Number,
  facilities: [String]
});
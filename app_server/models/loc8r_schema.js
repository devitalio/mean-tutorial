var mongoose = require('mongoose');

var locationSchema = mongoose.Schema({
  name: String,
  address: String,
  rating: Number,
  facilities: [String]
});
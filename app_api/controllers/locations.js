var helper = require('../lib/helpers');
var mongoose = require('mongoose');

var loc = mongoose.model('location');

module.exports.locationsListByDistance = function(req, res){
}

module.exports.locationsCreate = function(req, res){
  helpers.sendJSONResponce(res, 200, {'status':'success'});
}

module.exports.locationsReadOne = function(req, res){
}

module.exports.locationsDeleteOne = function(req, res){
}

module.exports.locationsUpdateOne = function(req, res){
}
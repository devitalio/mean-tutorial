var helpers = require('../lib/helpers');
var mongoose = require('mongoose');

var loc = mongoose.model('location');

module.exports.locationsListByDistance = function(req, res){
  helpers.sendJsonResponse(res, 200, {'status':'success'});
}

module.exports.locationsCreate = function(req, res){
  helpers.sendJsonResponse(res, 200, {'status':'success'});
}

module.exports.locationsReadOne = function(req, res){
  helpers.sendJsonResponse(res, 200, {'status':'success'});
}

module.exports.locationsDeleteOne = function(req, res){
  helpers.sendJsonResponse(res, 200, {'status':'success'});
}

module.exports.locationsUpdateOne = function(req, res){
  helpers.sendJsonResponse(res, 200, {'status':'success'});
}
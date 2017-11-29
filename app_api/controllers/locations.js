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
  if(!req.params || !req.params.locationid){
    helpers.sendJsonResponse(res, 404, {message: "No location id in request"});
    return;
  }
    
  loc.findById(req.params.locationid).exec(function(err, location){
    if(!location){
      helpers.sendJsonResponse(res, 404, {message: "No location found"});
      return;
    }
    else if(err){
      helpers.sendJsonResponse(res, 404, {message: "No location found"});
      return;
    }
    
    helpers.sendJsonResponse(res, 200, location);
  
  });
}

module.exports.locationsDeleteOne = function(req, res){
  helpers.sendJsonResponse(res, 200, {'status':'success'});
}

module.exports.locationsUpdateOne = function(req, res){
  helpers.sendJsonResponse(res, 200, {'status':'success'});
}
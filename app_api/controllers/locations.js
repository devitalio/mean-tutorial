var helpers = require('../lib/helpers');
var mongoose = require('mongoose');

var loc = mongoose.model('location');

var theEarth = (function(){
  var _earthRadius = 6371; // km, miles is 3959
  var getDistanceFromRads = function(rads) {
    return parseFloat(rads * _earthRadius);
  };

  var getRadsFromDistance = function(distance) {
    return parseFloat(distance / _earthRadius);
  };
  
  return {
    getDistanceFromRads : getDistanceFromRads,
    getRadsFromDistance : getRadsFromDistance
  };
})();


module.exports.locationsListByDistance = function(req, res){
  var lng = parseFloat(req.query.lng);
  var lat = parseFloat(req.query.lat);
  var maxDistance = 10; 
  if(req.query.maxDistance)
    maxDistance = parseFloat(req.query.maxDistance);
    
  var point = { type: "Point", coords: [lng,lat]};
  
  var options = {spherical: true, num:10, maxDistance: theEarth.getRadsFromDistance(100)};
  
  loc.geoNear([lng,lat], options, function(err, results, stats){
    if(err)
      return helpers.sendJsonResponse(res, 200, err); 
    var locations = [];
    results.forEach(function(doc){
      locations.push({
        distance: theEarth.getDistanceFromRads(doc.dis),
        name: doc.obj.name,
        address: doc.obj.address,
        rating: doc.obj.rating,
        facilities: doc.obj.facilities,
        _id: doc.obj._id
      });
    });
    
    return helpers.sendJsonResponse(res, 200, locations);
  });
  
  //helpers.sendJsonResponse(res, 404, {message: "No location found"});
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
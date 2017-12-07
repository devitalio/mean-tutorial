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

var parseTimetable = function(req){
  var timetable = [];
  var i = 0;
  while(req.body["days"+i]){
    timetable.push(
    {
      days: req.body["days"+i],
      opening: req.body["opening"+i],
      closing: req.body["closing"+i],
      closed: req.body["closed"+i] == 'true',
    });
    i++;
  }
  return timetable;
}

var getLocations = function(results){
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
  
  return locations;
};

module.exports.locationsListByDistance = function(req, res){
  var lng = parseFloat(req.query.lng);
  var lat = parseFloat(req.query.lat);
  
  if(!lng || !lat)
    return helpers.sendJsonResponse(res, 404, "No lattitude or longtitude specified");
  
  var maxDistance = 10; 
  if(req.query.maxDistance)
    maxDistance = parseFloat(req.query.maxDistance);
    
  var point = { type: "Point", coords: [lng,lat]};
  
  var options = {spherical: true, num:10, maxDistance: theEarth.getRadsFromDistance(100)};
  
  loc.geoNear([lng,lat], options, function(err, results, stats){
    if(err)
      return helpers.sendJsonResponse(res, 200, err); 
    
    
    return helpers.sendJsonResponse(res, 200, getLocations(results));
  });
};

module.exports.locationsCreate = function(req, res){
  var location = loc.create(
  {
    name: req.body.name,
    address: req.body.address,
    facilities: req.body.facilities !== undefined ? req.body.facilities.split(","): "unknown",
    coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
    openingTimes : parseTimetable(req)
  },
  function(err,result){
    if(err){
      helpers.sendJsonResponse(res, 404, err);
    }
    else{
      helpers.sendJsonResponse(res, 201, result);
    }
  });
};

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

module.exports.locationsUpdateOne = function(req, res){
  if (!req.params.locationid) {
    helpers.sendJsonResponse(res, 404, {"message": "Not found, locationid is required"});
    return;
  }
  
  loc
    .findById(req.params.locationid)
    .select('-reviews -rating')
    .exec(function(err, location) {
      if (!location) {
        helpers.sendJsonResponse(res, 404, {"message": "locationid not found"});
        return;
      } 
      else if (err) {
        helpers.sendJsonResponse(res, 400, err);
        return;
      }
      
      location.name = req.body.name ? req.body.name : location.name;
      location.address = req.body.address ? req.body.address : location.address;
      location.facilities = req.body.facilities ? req.body.facilities.split(",") : location.facilities;
      location.coords = req.body.lng && req.body.lat ? [parseFloat(req.body.lng), parseFloat(req.body.lat)] : location.coords ;
      location.openingTimes = req.body.days0 ? parseTimetable(req) : location.openingTimes;
      
      location.save(function(err, location) {
        if (err) { helpers.sendJsonResponse(res, 404, err); }
        else { helpers.sendJsonResponse(res, 200, location); }
      }); 
    });    
};

module.exports.locationsDeleteOne = function(req, res){
  helpers.sendJsonResponse(res, 200, {'status':'success'});
};
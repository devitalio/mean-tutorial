var helpers = require('../lib/helpers');
var mongoose = require('mongoose');

var loc = mongoose.model('location');

module.exports.reviewsCreateOne = function(req, res){
}

module.exports.reviewsReadOne = function(req, res){
  if(!req.params || !req.params.locationid || !req.params.reviewid){
    helpers.sendJsonResponse(res, 404, {message: "No location or review id in request"});
    return;
  }
    
  loc.findById(req.params.locationid)
     .select('name reviews')
     .exec(function(err, location)
      {
        var response, review;
        
        if(!location){
          helpers.sendJsonResponse(res, 404, {message: "No location found"});
          return;
        }
        else if(err){
          helpers.sendJsonResponse(res, 404, {message: "ERROR" + err});
          return;
        }      
        
        if (location.reviews && location.reviews.length > 0) {
          review = location.reviews.id(req.params.reviewid);
          if (!review) {
            helpers.sendJsonResponse(res, 404, { "message": "reviewid not found"});
          }
          else {
            response = { location : { name : location.name, id : req.params.locationid},
                         review : review };
            helpers.sendJsonResponse(res, 200, response);
          }
        }
        else {
          helpers.sendJsonResponse(res, 404, { "message": "No reviews found"});
        }
        
        helpers.sendJsonResponse(res, 200, location);
      });
}

module.exports.reviewsUpdateOne = function(req, res){
}

module.exports.reviewsDeleteOne = function(req, res){
}
var helpers = require('../lib/helpers');
var mongoose = require('mongoose');

var loc = mongoose.model('location');

module.exports.reviewsCreateOne = function(req, res){
  if(!req.params.locationid)
    return helpers.sendJsonResponse(res, 404, {message: "No location id in request"});
  var locationid = req.params.locationid;
  loc
    .findById(locationid)
    .select('reviews')
    .exec(function(err, location){
      if(err){
        return helpers.sendJsonResponse(res, 404, err);
      }
      else{
        addReview(req, res, location);
      }
    });
    
}

var addReview = function(req, res, location){
  location.reviews.push(
  {
    author: req.body.author,
    rating: req.body.rating,
    reviewText: req.body.reviewText
  });
  
  location.save(function(err, location) {
    var thisReview;
    if (err) {
      helpers.sendJsonResponse(res, 400, err);
    } else {
      updateAverageRating(location._id);
      thisReview = location.reviews[location.reviews.length - 1];
      helpers.sendJsonResponse(res, 201, thisReview);
    }
  });
  
};

var updateAverageRating = function(locationid){

  loc
    .findById(locationid)
    .select('rating reviews')
    .exec(function(err, location){
      if(!err){
      
        var sum = 0;
        for(var i = 0; i < location.reviews.length; i++){
          sum += location.reviews[i].rating;
        }
        
        var averageRating = parseInt(sum / i);
        
        location.rating = averageRating;
        
        location.save(function(err, location) {
          if (err) {
            console.log(err);
          } else {
            console.log(location.rating);
          }
        });
      }
    });
};



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
            return;
          }
          else {
            response = { location : { name : location.name, id : req.params.locationid},
                         review : review };
            helpers.sendJsonResponse(res, 200, response);
            return;
          }
        }
        else {
          helpers.sendJsonResponse(res, 404, { "message": "No reviews found"});
          return;
        }
        
        helpers.sendJsonResponse(res, 200, location);
      });
}

module.exports.reviewsUpdateOne = function(req, res){
}

module.exports.reviewsDeleteOne = function(req, res){
}
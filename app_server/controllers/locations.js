var request = require("request");
var apiOptions = {
  server: "http://localhost:3000"
};

if(process.env.NODE_ENV === "production")
{
  apiOptions.server = "http://vitalii.doljikov.com"
}

module.exports.homeList = function(req, res, next) {
  
  var path = '/api/locations';
  var requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {},
    qs: { lng: 23.59039306, lat: 46.7764343802, maxDistance: 20 },
    //qs: { lng: 0, lat: 0, maxDistance: 20 }
  };
  
  request(requestOptions, function(err, response, body) {
    
    if(response.statusCode === 200 && body.length){
      for(var i = 0; i < body.length; i++)
      {
        body[i].distance = _formatDistance(body[i].distance);
      }
    }
       
    renderHomepage(req,res, body);
    
  });
};

var renderHomepage = function(req, res, body) {

  var message;
  if(!(body instanceof Array)){
    message = "API lookup error";
    body = [];
  }else{
    if(!body.length){
      message = "No nearby places";
    }
      
  }
  
  res.render('locations-list',
  { 
    title: 'Loc8r - find a place to work with wifi',
    pageHeader: { title: 'Loc8r', strapline: 'Find places to work with wifi near you!'},
    sidebar: 'Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you\'re looking for.',
    locations: body,
    message: message
  });
};

var _formatDistance = function (distance) {
  if(isNaN(parseFloat(distance)))
    return distance;
    
  var numDistance, unit;
  if (distance > 1) {
    numDistance = parseFloat(distance).toFixed(1);
    unit = 'km';
  } else {
    numDistance = parseInt(distance * 1000, 10);
    unit = 'm';
  }
  return numDistance + unit;
};

var _getLocationInfo = function(req, res, callback){
  
  var path = '/api/locations/'+ req.params.locationid;
  var requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {},
  };
  
  request(requestOptions, function(err, response, body) {
    if(response.statusCode === 200){
      var data = body;
      data.coords = { lat: body.coords[1], lng: body.coords[0]};
      console.log(data);
      callback(req, res, data);
    }
    else{
      _showError(req, res, response.statusCode);
    }
  });
};

module.exports.locationInfo = function(req, res) {
  _getLocationInfo(req, res, renderDetailPage);
  
};

var renderDetailPage = function(req, res, data) {
  res.render('location-info', 
  { 
    title: data.name,
    pageHeader: {title: data.name},
    sidebar:
    {
      context:'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
      callForAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
    },
    location: data
  });
};

var _showError = function(req, res, result){
  res.status(result.statusCode);
  res.render('generic-text',
  {
    title: "Oups",
    content: "following error code was detected: "+ result
  });
};

module.exports.addReview = function(req, res) {
  _getLocationInfo(req, res, renderReviewForm);
};

var renderReviewForm = function(req, res, data){
  res.render('location-review-form', 
  {
    title: 'Add Review',
    pageHeader: {title: data.name}
  });
}


module.exports.doAddReview = function(req, res) {
  var locationid = req.params.locationid;
  var path = "/api/locations/" + locationid + '/reviews';
  postdata = {
    author: req.body.name,
    rating: parseInt(req.body.rating, 10),
    reviewText: req.body.review
  };
  
  requestOptions = {
    url : apiOptions.server + path,
    method : "POST",
    json : postdata
  };
  
  request(requestOptions, function(err, response, body) {
    if(response.statusCode === 201){
     res.redirect('/location/' + locationid);
    }
    else if(response.statusCode === 400 && body.name && body.name === "ValidationError"){
      res.redirect('/location/'+ locationid+ '/review/new?err=val' )
    }
    else {
      _showError(req, res, response);
    }
  });
}
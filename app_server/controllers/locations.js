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
        console.log(_formatDistance(body[i].distance));
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


module.exports.locationInfo = function(req, res, next) {
  res.render('location-info', 
  { 
    title: 'La Rochelle',
    pageHeader: {title: 'La Rochelle'},
    sidebar:
    {
      context:'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
      callForAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
    },
    location:
    {
      name: 'La Rochelle',
      address: 'str. Traian 2',
      rating: 5,
      facilities: ['Hot drinks', 'Premium WiFi'],
      distance: '100m',
      coords: {lat: 46.776446, lng: 23.590588},
      openingTimes:
      [
        { days: 'Mon - Fri', opening: '07:00am', closing: '07:00pm', closed: false},
        { days: 'Sat', opening: '08:00am', closing: '05:00pm', closed: false},
        { days: 'Sun', time: '', closed:true}
      ],
      reviews:
      [
        {author: 'Steve Jobs', rating:5, timestamp:'16 July 2017', reviewText:'What a great place. I can\'t say enough good things \n about it.'},
        {author: 'Bill Gates', rating:5, timestamp:'20 Sep 2017', reviewText:'It was okay. Coffee wasn\'t great, but the wifi was fast.'}
      ]
    }
  });
};

module.exports.addReview = function(req, res, next) {
  res.render('location-review-form', 
  {
    title: 'Add Review',
    pageHeader: {title: 'La Rochelle'}
  });
};
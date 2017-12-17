var request = require("request"):
var apiOptions = {
  server: "http://localhost:3000"
};

if(process.env.NODE_ENV === "production")
{
  apiOptions.server = "http://vitalii.doljikov.com"
}

module.exports.homeList = function(req, res, next) {
  res.render('locations-list',
  { 
    title: 'Loc8r - find a place to work with wifi',
    pageHeader: { title: 'Loc8r', strapline: 'Find places to work with wifi near you!'},
    sidebar: 'Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you\'re looking for.',
    locations: 
    [
      {
        name: 'La Rochelle',
        address: 'str. Traian 2',
        rating: 5,
        facilities: ['Hot drinks', 'Premium WiFi'],
        distance: '100m'
      },
      {
        name: 'Coffee Queens',
        address: 'Memorandumului 5',
        rating: 4,
        facilities: ['Food', 'Wifi'],
        distance: '500m'
      },
      {
        name: 'Burger King',
        address: 'Tipografiei 15',
        rating: 3,
        facilities: ['Food', 'Hot Drinks', 'Premium Wifi'],
        distance: '300m'
      }
    ] 
  });
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
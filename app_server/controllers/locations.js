module.exports.homeList = function(req, res, next) {
  res.render('locations-list',
  { 
    title: 'Loc8r - find a place to work with wifi',
    pageHeader: { title: 'Loc8r', strapline: 'Find places to work with wifi near you!'},
    locations: 
    [
      {
        name: 'Starcups',
        address: 'Decebal 12',
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
  res.render('location-info', { title: 'Location Info' });
};

module.exports.addReview = function(req, res, next) {
  res.render('location-review-form', { title: 'Add Review' });
};
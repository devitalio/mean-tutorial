var express = require('express');
var router = express.Router();
var locationsController = require('../controllers/locations');
var otherController = require('../controllers/other');

/* GET various location paged */
router.get('/', locationsController.homeList);
router.get('/location', locationsController.locationInfo);
router.get('/location/review/new', locationsController.addReview);

router.get('/about', otherController.about);

module.exports = router;
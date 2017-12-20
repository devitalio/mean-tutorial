var express = require('express');
var router = express.Router();
var locationsController = require('../controllers/locations');
var otherController = require('../controllers/other');

/* GET various location paged */
router.get('/', locationsController.homeList);
router.get('/location/:locationid', locationsController.locationInfo);
router.get('/location/:locationid/review/new', locationsController.addReview); //from the button to add review
router.post('/location/:locationid/review/new', locationsController.doAddReview); //from the form when submitting

router.get('/about', otherController.about);

module.exports = router;
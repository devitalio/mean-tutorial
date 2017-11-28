var express = require('express');
var router = express.Router();
var locationsController = require('../controllers/locations');
var reviewsController = require('../controllers/reviews');

router.get('/locations', locationsController.locationsListByDistance);
router.post('/locations', locationsController.locationsCreate);
router.get('/locations/:locationid', locationsController.locationsReadOne);
router.delete('/locations/:locationid', locationsController.locationsDeleteOne);
router.put('/locations/:locationid', locationsController.locationsUpdateOne);

router.get('/locations/:locationid/reviews/', reviewsController.reviewsCreateOne);
router.get('/locations/:locationid/reviews/:reviewid', reviewsController.reviewsReadOne);
router.put('/locations/:locationid/reviews/:reviewid', reviewsController.reviewsUpdateOne);
router.delete('/locations/:locationid/reviews/:reviewid', reviewsController.reviewsDeleteOne);

module.exports = router;
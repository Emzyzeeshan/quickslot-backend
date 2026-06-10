const router = require('express').Router();

const venueController =
    require('../controllers/venueController');

router.get('/', venueController.getVenues);

router.get('/:id/slots', venueController.getSlots);

module.exports = router;
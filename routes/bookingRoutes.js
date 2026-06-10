const router = require('express').Router();

const bookingController =
    require('../controllers/bookingController');

router.post('/', bookingController.createBooking);

router.delete('/:id',
    bookingController.cancelBooking);

module.exports = router;
const router = require('express').Router();

const userController =
    require('../controllers/userController');

router.get('/:id/bookings',
    userController.getBookings);

module.exports = router;
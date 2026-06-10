const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const venueRoutes = require('./routes/venueRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());

app.use(express.json());

app.use(morgan('dev'));

app.use('/venues', venueRoutes);

app.use('/bookings', bookingRoutes);

app.use('/users', userRoutes);

module.exports = app;
const prisma = require('../config/prisma');

exports.createBooking = async (req, res) => {

    try {

        const userId =
            req.headers['x-user-id'];

        const { slotId } = req.body;

        if (!userId || !slotId) {
            return res.status(400).json({
                message: 'Missing data'
            });
        }

        const booking =
            await prisma.booking.create({
                data: {
                    userId,
                    slotId
                }
            });

        return res.status(201).json({
            message: 'Booking Success',
            booking
        });

    } catch (error) {

        if (error.code === 'P2002') {

            return res.status(409).json({
                message: 'Slot already booked'
            });

        }

        return res.status(500).json({
            message: 'Server Error'
        });

    }

};

exports.cancelBooking = async (req, res) => {

    const { id } = req.params;

    await prisma.booking.delete({
        where: {
            id
        }
    });

    res.json({
        message: 'Booking Cancelled'
    });

};
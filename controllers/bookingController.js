const prisma = require('../config/prisma');

exports.createBooking =
    async (req, res) => {

        try {

            const userId =
                req.headers['x-user-id'];

            const { slotId } =
                req.body;

            if (!userId) {
                return res.status(401).json({
                    message: 'User header missing'
                });
            }

            if (!slotId) {
                return res.status(400).json({
                    message: 'Slot ID required'
                });
            }

            const slot =
                await prisma.slot.findUnique({
                    where: {
                        id: slotId
                    }
                });

            if (!slot) {
                return res.status(404).json({
                    message: 'Slot not found'
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
                message: 'Booking successful',
                booking
            });

        } catch (error) {

            console.log('BOOKING ERROR');
            console.log(error);

            if (error.code === 'P2002') {

                return res.status(409).json({
                    message: 'Slot already booked'
                });

            }

            return res.status(500).json({
                message: error.message
            });
        }
    };

exports.cancelBooking =
    async (req, res) => {

        try {

            const { id } =
                req.params;

            await prisma.booking.delete({
                where: {
                    id
                }
            });

            return res.json({
                message:
                    'Booking cancelled'
            });

        } catch (error) {

            return res.status(404).json({
                message:
                    'Booking not found'
            });

        }
    };
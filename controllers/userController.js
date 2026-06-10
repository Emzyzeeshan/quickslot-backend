const prisma =
    require('../config/prisma');

exports.getBookings =
    async (req, res) => {

        try {

            const { id } =
                req.params;

            const bookings =
                await prisma.booking.findMany({
                    where: {
                        userId: id
                    },
                    include: {
                        slot: {
                            include: {
                                venue: true
                            }
                        }
                    }
                });

            return res.json(bookings);

        } catch (error) {

            return res.status(500).json({
                message:
                    'Failed to fetch bookings'
            });

        }
    };
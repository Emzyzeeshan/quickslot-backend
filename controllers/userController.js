const prisma = require('../config/prisma');

exports.getBookings = async (req, res) => {

    const { id } = req.params;

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

    res.json(bookings);

};
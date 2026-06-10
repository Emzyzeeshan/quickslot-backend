const prisma = require('../config/prisma');

exports.getVenues = async (req, res) => {

    const venues = await prisma.venue.findMany();

    res.json(venues);

};

exports.getSlots = async (req, res) => {

    const { id } = req.params;

    const { date } = req.query;

    const slots = await prisma.slot.findMany({
        where: {
            venueId: id,
            date: new Date(date)
        },
        include: {
            booking: true
        }
    });

    const result = slots.map(slot => ({
        id: slot.id,
        startTime: slot.startTime,
        endTime: slot.endTime,
        available: !slot.booking
    }));

    res.json(result);

};
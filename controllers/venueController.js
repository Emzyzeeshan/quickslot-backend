const prisma = require('../config/prisma');

exports.getVenues = async (req, res) => {
    try {

        const venues =
            await prisma.venue.findMany();

        return res.status(200).json(venues);

    } catch (error) {

        return res.status(500).json({
            message: 'Failed to fetch venues'
        });

    }
};

exports.getSlots = async (req, res) => {

    try {

        const { id } = req.params;

        const { date } = req.query;

        if (!date) {
            return res.status(400).json({
                message: 'Date is required'
            });
        }

        const selectedDate =
            new Date(date);

        const nextDay =
            new Date(selectedDate);

        nextDay.setDate(
            nextDay.getDate() + 1
        );

        const slots =
            await prisma.slot.findMany({
                where: {
                    venueId: id,
                    date: {
                        gte: selectedDate,
                        lt: nextDay
                    }
                },
                include: {
                    booking: true
                }
            });

        const response =
            slots.map(slot => ({
                id: slot.id,
                startTime: slot.startTime,
                endTime: slot.endTime,
                available: !slot.booking
            }));

        return res.json(response);

    } catch (error) {

        return res.status(500).json({
            message: 'Failed to fetch slots'
        });

    }
};
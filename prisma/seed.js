const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seed...');

    // Clean existing data
    await prisma.booking.deleteMany();
    await prisma.slot.deleteMany();
    await prisma.venue.deleteMany();
    await prisma.user.deleteMany();

    console.log('🗑 Existing data cleared');

    // Create Users
    const users = await prisma.user.createMany({
        data: [
            { name: 'John' },
            { name: 'Sarah' },
            { name: 'David' },
        ],
    });

    console.log(`✅ ${users.count} users created`);

    // Create Venues
    const venues = await Promise.all([
        prisma.venue.create({
            data: {
                name: 'Arena Badminton',
                location: 'Madhapur',
                sportType: 'Badminton',
            },
        }),
        prisma.venue.create({
            data: {
                name: 'Elite Turf',
                location: 'Gachibowli',
                sportType: 'Football',
            },
        }),
        prisma.venue.create({
            data: {
                name: 'Quick Court',
                location: 'Kondapur',
                sportType: 'Badminton',
            },
        }),
        prisma.venue.create({
            data: {
                name: 'Victory Sports',
                location: 'Hitech City',
                sportType: 'Cricket',
            },
        }),
        prisma.venue.create({
            data: {
                name: 'Champions Arena',
                location: 'Kukatpally',
                sportType: 'Football',
            },
        }),
    ]);

    console.log(`✅ ${venues.length} venues created`);

    // Create slots for next 14 days
    let totalSlots = 0;

    for (const venue of venues) {
        const slots = [];

        for (let day = 0; day < 14; day++) {
            const slotDate = new Date();

            slotDate.setHours(0, 0, 0, 0);
            slotDate.setDate(slotDate.getDate() + day);

            // 6 AM -> 10 PM
            for (let hour = 6; hour < 22; hour++) {
                slots.push({
                    venueId: venue.id,
                    date: slotDate,
                    startTime: `${hour.toString().padStart(2, '0')}:00`,
                    endTime: `${(hour + 1).toString().padStart(2, '0')}:00`,
                });
            }
        }

        await prisma.slot.createMany({
            data: slots,
        });

        totalSlots += slots.length;
    }

    console.log(`✅ ${totalSlots} slots created`);

    console.log('🎉 Database seeded successfully');
}

main()
    .catch((error) => {
        console.error('❌ Seed failed');
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
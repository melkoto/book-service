const cron = require('node-cron')
const prisma = require('../../prisma/prismaClient')

const runCleanupJob = () => {
    cron.schedule('*/1 * * * *', async () => {
        const now = new Date()
        console.log('Token Cleanup job...')
        const result = await prisma.refreshToken.deleteMany({
            where: {
                expiryDate: {
                    lt: now,
                },
            },
        });
        console.log(`Deleted ${result.count} tokens`);
    })
}

module.exports = runCleanupJob
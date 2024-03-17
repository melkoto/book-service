const cron = require('node-cron')
const prisma = require('../../prisma/prismaClient')

const runCleanupJob = () => {
    cron.schedule('0 0 * * *', async () => {
        const now = new Date()
        await prisma.refreshToken.deleteMany({
            where: {
                expiryDate: {
                    lt: now,
                },
            },
        })
    })
}

module.exports = runCleanupJob
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs')
const { USER_NOT_FOUND, INVALID_PASSWORD } = require('./user.constants')

exports.createUser = async ({ email, password, name }) => {
    const hashedPassword = await bcrypt.hash(password, 8)
    return prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    })
}

exports.authenticateUser = async ({ email, password }) => {
    const user = await prisma.user.findUnique({
        where: { email },
    })

    if (!user) {
        throw new Error(USER_NOT_FOUND)
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        throw new Error(INVALID_PASSWORD)
    }

    return user
}

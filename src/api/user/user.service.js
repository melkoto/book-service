const bcrypt = require('bcryptjs')
const { verify, sign } = require('jsonwebtoken')
const { USER_NOT_FOUND, INVALID_PASSWORD } = require('./user.constants')
const prisma = require('../../../prisma/prismaClient')

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

exports.generateTokens = async (userId) => {
    const accessToken = sign({ userId }, process.env.JWT_SECRET, { expiresIn: '24h' })
    const refreshToken = await this.createOrUpdateRefreshToken(userId)
    return { accessToken, refreshToken }
}

exports.deleteRefreshToken = async (token) => {
    await prisma.refreshToken.delete({
        where: { token },
    })
}

exports.createUser = async ({ email, password, name }) => {
    const hashedPassword = await bcrypt.hash(password, 8)
    return prisma.user.create({
        data: {
            name, email, password: hashedPassword,
        },
    })
}

exports.verifyAndDeleteRefreshToken = async (refreshToken) => {
    const decoded = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)

    const storedToken = await prisma.refreshToken.findUnique({
        where: { token: refreshToken },
    })

    if (!storedToken || storedToken.expiryDate < new Date()) {
        throw new Error('Invalid or expired refresh token')
    }

    await prisma.refreshToken.delete({
        where: {
            token: refreshToken,
        },
    })

    return decoded.userId
}

exports.createOrUpdateRefreshToken = async (userId) => {
    const refreshToken = sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
    const expiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

    const existingToken = await prisma.refreshToken.findFirst({
        where: { userId: userId },
    })

    if (existingToken) {
        await prisma.refreshToken.update({
            where: { id: existingToken.id }, data: { token: refreshToken, expiryDate: expiryDate },
        })
    } else {
        await prisma.refreshToken.create({
            data: { userId: userId, token: refreshToken, expiryDate: expiryDate },
        })
    }

    return refreshToken
}


exports.verifyRefreshToken = async (token) => {
    const refreshToken = await prisma.refreshToken.findUnique({
        where: { token },
    })

    if (!refreshToken || refreshToken.expiryDate < new Date()) {
        throw new Error('Invalid or expired refresh token')
    }

    return verify(token, process.env.REFRESH_TOKEN_SECRET)
}


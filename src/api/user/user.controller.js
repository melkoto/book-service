const { validationResult } = require('express-validator')
const userService = require('./user.service')
const {
    USER_REGISTERED_SUCCESS,
    USER_LOGGED_IN_SUCCESS,
    USER_NOT_FOUND,
    INVALID_PASSWORD,
    EMAIL_PASSWORD_ERROR,
} = require('./user.constants')
const asyncHandler = require('../../middleware/asyncHandler')
const { userResponseDto } = require('./user.response.dto')


exports.login = asyncHandler(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    try {
        const user = await userService.authenticateUser({ email, password })
        const { accessToken, refreshToken } = await userService.generateTokens(user.id)

        res.json({
            message: USER_LOGGED_IN_SUCCESS,
            user: userResponseDto(user),
            accessToken,
            refreshToken,
        })
    } catch (error) {
        if (error.message === USER_NOT_FOUND || error.message === INVALID_PASSWORD) {
            return res.status(401).json({ message: EMAIL_PASSWORD_ERROR })
        }
        res.status(500).json({
            message: 'An error occurred during the login process.',
        })
    }
})


exports.logout = async (req, res) => {
    const { refreshtoken } = req.headers

    if (!refreshtoken) {
        return res.status(400).json({ message: 'Refresh token is required for logout' })
    }

    try {
        await userService.deleteRefreshToken(refreshtoken)

        res.clearCookie('refreshToken')
        res.clearCookie('accessToken')

        res.status(200).json({ message: 'Logged out successfully' })
    } catch (error) {
        res.status(500).json({ message: 'An error occurred during the logout process.' })
    }
}

exports.register = asyncHandler(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password, name } = req.body
    const user = await userService.createUser({ email, password, name })

    const { accessToken, refreshToken } = await userService.generateTokens(user.id)

    const userInfo = {
        id: user.id,
        email: user.email,
        name: user.name,
    }

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000, // 24 часа
    })

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней
    })

    res.status(201).json({
        message: USER_REGISTERED_SUCCESS,
        user: userInfo,
        accessToken,
        refreshToken,
    })
})

exports.refreshToken = asyncHandler(async (req, res) => {
    const { refreshToken } = req.cookies
    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token is required' })
    }

    try {
        const userId = await userService.verifyAndDeleteRefreshToken(refreshToken)
        const { accessToken, refreshToken: newRefreshToken } = await userService.generateTokens(userId)

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000,
        })

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        res.status(200).json({
            message: 'Tokens refreshed successfully',
            accessToken,
            refreshToken: newRefreshToken,
        })
    } catch (error) {
        res.status(401).json({ message: 'Invalid refresh token' })
    }
})

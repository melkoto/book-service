const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

const userService = require('./user.service')
const asyncHandler = require('../../middleware/asyncHandler')
const {
    USER_REGISTERED_SUCCESS,
    USER_LOGGED_IN_SUCCESS,
    USER_NOT_FOUND,
    INVALID_PASSWORD,
    EMAIL_PASSWORD_ERROR,
} = require('./user.constants')

exports.register = asyncHandler(async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password, name } = req.body
    const user = await userService.createUser({ email, password, name })

    // Генерация JWT токена
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '24h',
    })

    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000,
    })

    res.status(201).json({
        message: USER_REGISTERED_SUCCESS,
        userId: user.id,
        token,
    })
})

exports.login = asyncHandler(async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    try {
        const user = await userService.authenticateUser({ email, password })
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: '24h',
        })
        res.json({ message: USER_LOGGED_IN_SUCCESS, userId: user.id, token })
    } catch (error) {
        if (
            error.message === USER_NOT_FOUND ||
            error.message === INVALID_PASSWORD
        ) {
            return res.status(401).json({ message: EMAIL_PASSWORD_ERROR })
        }
        res.status(500).json({
            message: 'An error occurred during the login process.',
        })
    }
})

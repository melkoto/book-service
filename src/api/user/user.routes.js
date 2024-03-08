const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const {
    VALID_EMAIL_REQUIRED,
    PASSWORD_MIN_LENGTH,
    PASSWORD_REQUIRED,
} = require('./user.constants')

const userController = require('./user.controller')
const { registerUserDto, loginUserDto } = require('./user.request.dto')

router.post('/register', registerUserDto, userController.register)
router.post('/login', loginUserDto, userController.login)

module.exports = router

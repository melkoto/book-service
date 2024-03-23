const express = require('express')
const router = express.Router()

const userController = require('./user.controller')
const { registerUserDto, loginUserDto } = require('./user.request.dto')

router.post('/login', loginUserDto, userController.login)
router.post('/logout', userController.logout)
router.post('/register', registerUserDto, userController.register)
router.post('/refresh-token', userController.refreshToken)


module.exports = router

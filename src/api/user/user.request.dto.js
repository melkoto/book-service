const { body } = require('express-validator')
const {
    VALID_EMAIL_REQUIRED,
    PASSWORD_MIN_LENGTH,
    PASSWORD_REQUIRED,
    PASSWORD_MUST_BE_STRING,
} = require('./user.constants')

exports.registerUserDto = [
    body('email').isEmail().withMessage(VALID_EMAIL_REQUIRED),
    body('password').isLength({ min: 5 }).withMessage(PASSWORD_MIN_LENGTH),
]

exports.loginUserDto = [
    body('email').isEmail().withMessage(VALID_EMAIL_REQUIRED),
    body('password').not().isEmpty().withMessage(PASSWORD_REQUIRED),
    body('password').isString().withMessage(PASSWORD_MUST_BE_STRING),
]

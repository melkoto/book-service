const { body } = require('express-validator')
const {
    BOOK_TITLE_REQUIRED_ERROR,
    BOOK_AUTHOR_REQUIRED_ERROR,
} = require('./books.constants')

exports.updateBookDto = [
    body('title')
        .optional()
        .trim()
        .isLength({ min: 2 })
        .withMessage(BOOK_TITLE_REQUIRED_ERROR),
    body('author')
        .optional()
        .trim()
        .isLength({ min: 2 })
        .withMessage(BOOK_AUTHOR_REQUIRED_ERROR),
]
exports.createBookDto = [
    body('title')
        .trim()
        .isLength({ min: 2 })
        .withMessage(BOOK_TITLE_REQUIRED_ERROR),
    body('author')
        .trim()
        .isLength({ min: 2 })
        .withMessage(BOOK_AUTHOR_REQUIRED_ERROR),
]

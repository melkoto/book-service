const express = require('express')
const bookController = require('./book.controller')
const {
    BOOK_TITLE_REQUIRED_ERROR,
    BOOK_AUTHOR_REQUIRED_ERROR,
    BOOK_TITLE_EMPTY_ERROR,
    BOOK_AUTHOR_EMPTY_ERROR,
} = require('./books.constants')
const { createBookDto, updateBookDto } = require('./book.request.dto')

const router = express.Router()

router
    .route('/')
    .get(bookController.getAllBooks)
    .post(createBookDto, bookController.createBook)

router
    .route('/:bookId')
    .get(bookController.getBookById)
    .put(updateBookDto, bookController.updateBook)
    .delete(bookController.deleteBook)

module.exports = router

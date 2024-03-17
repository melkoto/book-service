const bookService = require('./book.service')
const bookResponseDto = require('./book.response.dto')
const asyncHandler = require('../../middleware/asyncHandler')

exports.getAllBooks = asyncHandler(async (req, res) => {
    const books = await bookService.findAll()
    res.json(books)
})

exports.getBookById = asyncHandler(async (req, res) => {
    const { bookId } = req.params
    const book = await bookService.findById(bookId)
    if (!book) {
        return res.status(404).json({ message: 'Book not found' })
    }
    res.json(bookResponseDto(book))
})

exports.createBook = asyncHandler(async (req, res) => {
    const { title, description, author } = req.body
    const { userId } = req.user

    try {
        const newBook = await bookService.create({
            title, description, author, userId,
        })
        res.status(201).json(newBook)
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred during the book creation process.', error: error.message,
        })
    }
})

exports.updateBook = asyncHandler(async (req, res) => {
    const { bookId } = req.params
    const updatedBook = await bookService.update(bookId, req.body)
    if (!updatedBook) {
        return res.status(404).json({ message: 'Book not found' })
    }
    res.json(updatedBook)
})

exports.deleteBook = asyncHandler(async (req, res) => {
    const { bookId } = req.params
    const success = await bookService.delete(bookId)
    if (!success) {
        return res.status(404).json({ message: 'Book not found' })
    }
    res.status(204).send()
})

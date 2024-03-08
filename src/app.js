require('dotenv').config()
const express = require('express')
const morgan = require('morgan')

const bookRoutes = require('./api/book/book.routes')
const userRoutes = require('./api/user/user.routes')
const errorHandler = require('./middleware/errorHandler')
const verifyToken = require('./middleware/verifyToken')

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(morgan('dev'))

app.use('/api/users', userRoutes)
app.use('/api/books', verifyToken, bookRoutes)

// app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

module.exports = app

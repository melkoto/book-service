require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const bookRoutes = require('./api/book/book.routes')
const userRoutes = require('./api/user/user.routes')
const errorHandler = require('./middleware/errorHandler')
const verifyToken = require('./middleware/verifyToken')
const runCleanupJob = require('./schedulers/tokenCleanup')

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(cookieParser())

app.use('/api/users', userRoutes)
app.use('/api/books', verifyToken, bookRoutes)

app.use(errorHandler)

runCleanupJob()

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

module.exports = app

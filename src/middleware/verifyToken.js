const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    // "Bearer TOKEN_HERE"
    const token = req.headers['authorization']?.split(' ')[1]

    if (!token) {
        return res
            .status(403)
            .json({ message: 'Signup or login to get access' })
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        return res.status(401).json({ message: 'Invalid Token' })
    }

    return next()
}

module.exports = verifyToken

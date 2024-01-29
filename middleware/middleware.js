const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

function authMiddleware(req,res,next) {
    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({
            message: "Unauthorized - Authorization header missing"
        });
    }

    const token = authorization.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.userId = decoded.userId;

        next();
    } catch (error) {
        return res.status(411).json({
            messgage : "Authorization failed"
        });
    }
}

module.exports = {
    authMiddleware
}
const jwt = require('jsonwebtoken');
const HttpError = require('../models/HttpError');

const jwtMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Get the token from the Authorization header

    if (!token) {
        return next(new HttpError('Authentication failed, token missing.', 401));
    }

    try {
        const decodedToken = jwt.verify(token, process.env.mahvish); 
        req.user = { id: decodedToken.userId }; 
        next(); 
    } catch (err) {
        return next(new HttpError('Authentication failed, invalid token.', 401));
    }
};

module.exports = jwtMiddleware;

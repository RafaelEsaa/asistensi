const config = require('../config');
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const getToken = req.headers.authorization;

    if (getToken) {
        const token = req.headers.authorization;
        jwt.verify(token, config.SERVER.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    error: 'UNAUTHORIZED_TOKEN',
                    data: 'Unauthorized token'
                });
            }

            req.decode = decode;
            return next();
        });
        return;
    }
    return res.status(401).json({
        success: false,
        error: 'UNAUTHORIZED_TOKEN',
        data: 'Unauthorized token'
    });
};

module.exports = {
    verifyToken
};
const jwt = require("jsonwebtoken");
const { secretKey  } = require("../configuration/jwtConfig");


const authenticateToken = (req, res, next) => {

    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, secretKey ); // Use secretKey directly
        req.user = decoded;
        next();
    } catch (err) {
        console.error('Token verification error:', err.message); // Log error message
        return res.status(401).json({ message: 'Token is not valid', error: err.message });
    }
};

module.exports = authenticateToken;

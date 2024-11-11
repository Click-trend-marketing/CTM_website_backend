const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../utility/config');

const jwtVerify = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        
        if (!authHeader) {
            return res.status(401).json({ statusCode: 404, message: 'Token is required' });
        }
        
        const token = authHeader.split(' ')[1];
        const decode = jwt.verify(token, JWT_SECRET_KEY);
        req.user = decode;
        next();
    } catch (error) {
        console.error(error);
        return res.status(403).json({ statusCode: 403, message: 'Invalid or expired token' });
    }
};

// Middleware to check user role
const roleAuth = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ statusCode: 404, message: 'Not authenticated' });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ statusCode: 403, message: 'Forbidden: Insufficient permissions' });
        }

        next();
    };
};
 module.exports = {jwtVerify,
    roleAuth
 }
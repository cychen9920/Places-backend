//make sure only authenticated users can access routes

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key';

//middleware func to handle token auth
function authenticateToken(req, res, next) {
    //get token from req
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    //no token found
    if (!token) {
    return res.status(401).json({ error: 'Access denied, no token provided' });
    }

    //try to verify JWT token
    try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { userId: ... }
    next();
    }
    catch (err) {
    return res.status(403).json({ error: 'Invalid/expired token' });
    }
}

module.exports = authenticateToken;

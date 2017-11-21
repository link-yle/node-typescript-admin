const jwt = require('jsonwebtoken');
const {userSecret} = require('../config/commonConstants')
function getToken(_id, role, secret) {
    return jwt.sign({
        _id: _id,
        role: role
    }, secret, {
            expiresIn: 60 * 60 * 24 * 365
        });
}

 function verifyUser (req, res, next) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') { 
        const token = req.headers.authorization.split(' ')[1] 
        jwt.verify(token, req.app.get(userSecret), function (err, decoded) {
            if (err) return res.status(401).json('Failed to authenticate token.');
            req.decoded = decoded;
            next();
        });
    }
    else return res.status(401).json('No token provided for admin.'); 
}




module.exports = {getToken, verifyUser}
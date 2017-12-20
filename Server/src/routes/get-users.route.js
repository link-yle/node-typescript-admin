const ROLES = require('../config/rolesConstants')
const db = require('../database/get-users.db')

module.exports = (req, res, next) => {
    let promise
    const query = { limit: 10, skip: parseInt(req.query.skip) }
    if (req.decoded.role === ROLES.manager) {
        promise = Promise.all([db.getRegularUsers(query), db.getRegularUsersCount()])
    } else {
        promise = Promise.all([db.getAllUsers(query), db.getAllUsersCount()])
    }
    return promise.then(([users, count]) => res.status(200).json({ users, count })).catch(err => next(err))
}
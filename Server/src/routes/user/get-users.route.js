const ROLES = require('../../config/rolesConstants')
const GetUserQuery = require('../../data-layer/get-users.db')

module.exports = (req, res, next) => {
    const getUserQuery = new GetUserQuery(10, parseInt(req.query.skip),
        req.decoded.role === ROLES.manager ? ROLES.regular : req.query.roleFilter, req.query.searchFilter)
    return Promise.all([getUserQuery.getUsers(), getUserQuery.getUsersCount()])
        .then(([users, count]) => res.status(200).json({ users, count })).catch(err => next(err))
}
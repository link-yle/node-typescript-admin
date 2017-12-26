const ROLES = require('../config/rolesConstants')
const getUserRoleByIdFromDb = require('../data-layer/get-user-role-by-id')



function preventRegularUsers(req, res, next) {
    const role = req.decoded.role
    if (role === ROLES.regular) return res.status(403).json('Not Authorized.');
    return next()
}

function allowOnlyRegularUsersToAccessed(req, res, next) {
    return getUserRoleByIdFromDb(req.params.id)
        .then(toBeAccessedRole => {
            if (!toBeAccessedRole) return next({ nF: 'user' })
            if (toBeAccessedRole === ROLES.regular) {
                return next()
            } else {
                return res.status(403).json('Not Authorized to manipulate non regular users.');
            }
        })
        .catch(e => next(e))
}



function allowAdminAndManager(req, res, next) {
    const role = req.decoded.role
    switch (role) {
        case ROLES.regular: return res.status(403).json('Not Authorized.');
        case ROLES.admin: return next();
        case ROLES.manager: return allowOnlyRegularUsersToAccessed(req, res, next)
    }
}

function allowSelfAdminAndManager(req, res, next) {
    const role = req.decoded.role
    switch (role) {
        case ROLES.regular: return   (req.decoded._id === req.params.id) ? next() : res.status(403).json('Not Authorized.');
        case ROLES.admin: return next();
        case ROLES.manager: return allowOnlyRegularUsersToAccessed(req, res, next)
    }
}


function allowSelfAndAdminOnly(req, res, next) {
    const role = req.decoded.role
    if (req.decoded._id === req.params.id || role === ROLES.admin) {
        return next()
    }
    else return res.status(403).json('Not Authorized.');
}

function allowAdminOnly(req, res, next) {
    const role = req.decoded.role
    if (role === ROLES.admin) {
        return next()
    }
    else return res.status(403).json('Not Authorized.');
}



module.exports = { allowAdminAndManager, allowSelfAdminAndManager, preventRegularUsers, allowSelfAndAdminOnly, allowAdminOnly }


const ROLES = require('../config/rolesConstants')
const usersModel = require('../models/users.model')


function preventRegularUsers(req, res, next) {
    const role = req.decoded.role
    if (role === ROLES.regular) return res.status(403).json('Not Authorized.');
    else return next()
}

async function allowAdminAndManager(req, res, next) {
    const role = req.decoded.role
    switch (role) {
        case ROLES.regular: return res.status(403).json('Not Authorized.');
        case ROLES.admin: return next();
        case ROLES.manager:
            const toBeAccessedRole = await fetchUserRoleFromBackend(req.params.id)
            if (toBeAccessedRole === ROLES.regular) {
                return next()
            } else {
                return res.status(403).json('Not Authorized to manipulate non regular users.');
            }
    }
}

async function allowSelfAdminAndManager(req, res, next) {
    const role = req.decoded.role
    switch (role) {
        case ROLES.regular:
            if (req.decoded._id === req.params.id) return next()
            else return res.status(403).json('Not Authorized.');
        case ROLES.admin: return next();
        case ROLES.manager:
            const toBeAccessedRole = await fetchUserRoleFromBackend(req.params.id)
            if (toBeAccessedRole === ROLES.regular) {
                return next()
            } else {
                return res.status(403).json('Not Authorized to manipulate non regular users.');
            }
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

async function fetchUserRoleFromBackend(id) {
    return (await usersModel.findById(id).select('role').lean().exec()).role
}

module.exports = { allowAdminAndManager, allowSelfAdminAndManager, preventRegularUsers, allowSelfAndAdminOnly, allowAdminOnly }


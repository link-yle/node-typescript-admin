const ROLES = require('../config/rolesConstants')
const getUserRoleByIdFromDb =  require('../data-layer/get-user-role-by-id')
    


function preventRegularUsers(req, res, next) {
    const role = req.decoded.role
    if (role === ROLES.regular) return res.status(403).json('Not Authorized.');
    return next()
}

async function allowAdminAndManager(req, res, next) {
    const role = req.decoded.role
    switch (role) {
        case ROLES.regular: return res.status(403).json('Not Authorized.');
        case ROLES.admin: return next();
        case ROLES.manager:
            const toBeAccessedRole = getUserRoleByIdFromDb(req.params.id).catch(err=>next(err))
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
            const toBeAccessedRole = getUserRoleByIdFromDb(req.params.id).catch(err=>next(err))
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



module.exports = { allowAdminAndManager, allowSelfAdminAndManager, preventRegularUsers, allowSelfAndAdminOnly, allowAdminOnly }


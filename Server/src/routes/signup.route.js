
const addNewUser = require('../data-layer/add-new-user.db')
const ROLES = require('../config/rolesConstants')


module.exports = (req, res, next) => {
    return addNewUser(req.body, ROLES.regular).then(added => {
        added.password = undefined
        return res.status(200).json(added)
    }).catch(e => next(e))
}




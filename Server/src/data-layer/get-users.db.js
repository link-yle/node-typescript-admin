const usersModel = require('../models/users.model')
const ROLES = require('../config/rolesConstants')

module.exports = {
    getAllUsers({limit, skip}) {
        return usersModel.find().limit(limit).skip(skip).select('_id name email role').lean().exec()
    },

    getAllUsersCount() {
        return usersModel.find().count().exec()
    },

    getRegularUsers({limit, skip}) {
        return usersModel.find({ role: ROLES.regular }).limit(limit).skip(skip).select('_id name email').lean().exec()
    },

    getRegularUsersCount() {
        return usersModel.find({ role: ROLES.regular }).count().exec()
    },
}
    
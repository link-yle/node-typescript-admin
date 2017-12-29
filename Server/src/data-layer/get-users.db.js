const usersModel = require('../models/users.model')
const ROLES = require('../config/rolesConstants')

module.exports = {
    getAllUsers({ limit, skip, filter }) {
        const query = filter ? { name: { $regex: RegExp(`.*${filter}.*`) } } : {}
        return usersModel.find(query).limit(limit).skip(skip).select('_id name email role').lean().exec()
    },

    getAllUsersCount(filter) {
        const query = filter ? { name: { $regex: RegExp(`.*${filter}.*`) } } : {}
        return usersModel.find(query).count().lean().exec()
    },

    getRegularUsers({ limit, skip, filter }) {
        const query = filter ? { role: ROLES.regular, name: { $regex: RegExp(`.*${filter}.*`) } } : { role: ROLES.regular}
        return usersModel.find(query).limit(limit).skip(skip).select('_id name email').lean().exec()
    },

    getRegularUsersCount(filter) {
        const query = filter ? { role: ROLES.regular, name: { $regex: RegExp(`.*${filter}.*`) } } : { role: ROLES.regular}
        return usersModel.find(query).count().lean().exec()
    },
}

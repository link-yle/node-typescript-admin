const usersModel = require('../models/user.schema')

module.exports = (payload, role) => {
    const newUser = new usersModel(payload)
    newUser.timeZones = []
    newUser.role = role
    return newUser.save(payload)
}
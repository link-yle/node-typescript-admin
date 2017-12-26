const usersModel = require('../models/users.model')

module.exports = (payload, role) => {
    const newUser = new usersModel(payload)
    newUser.timeZones = []
    newUser.role = role
    return newUser.save()
}
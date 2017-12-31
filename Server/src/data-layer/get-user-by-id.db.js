const usersModel = require('../models/users.model')

module.exports = async (id) => {
    return usersModel.findById(id).exec()
}
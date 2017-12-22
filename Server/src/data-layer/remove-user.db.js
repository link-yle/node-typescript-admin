const usersModel = require('../models/users.model')

module.exports = (id) =>  {
    return usersModel.findByIdAndRemove(id)
}
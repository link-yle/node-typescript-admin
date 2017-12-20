const usersModel = require('../models/users.model')

module.exports = (_id, email, name) => {
    return usersModel.findOneAndUpdate({ _id }, { email, name }, { new: true })
}
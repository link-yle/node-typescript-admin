const usersModel = require('../models/users.model')

module.exports = (email, activationCode) =>  {
    return usersModel.findOneAndUpdate(
        { email },
        { $set: { activationCode } },
        { new: true }
    )
}
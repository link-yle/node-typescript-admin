const usersModel = require('../models/users.model')

module.exports = (email, code) =>  {
    return usersModel.findOneAndUpdate(
        { email },
        { $set: { recoveryCode: code, recoveryCodeDate: Date.now() } },
        { new: true }
    )
}
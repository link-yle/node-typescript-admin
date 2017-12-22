const usersModel = require('../models/users.model')

module.exports = (userId, newTimeZone) => {
    return usersModel.findOneAndUpdate(
        { _id: userId },
        { $push: { timeZones: newTimeZone } },
        { new: true })
}
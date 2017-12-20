const usersModel = require('../models/users.model')

module.exports = (userId, timeZoneId) => {
    return usersModel.findOneAndUpdate(
        { _id: userId },
        { $pull: { timeZones: { _id: timeZoneId } } },
        { new: true })
}
const usersModel = require('../models/users.model')

module.exports = (_id, timeZoneId, updatedTimeZone) =>  {
    return usersModel.findOneAndUpdate(
        { _id, "timeZones._id": timeZoneId },
        { $set: { "timeZones.$": updatedTimeZone } },
        { new: true }
    )
}


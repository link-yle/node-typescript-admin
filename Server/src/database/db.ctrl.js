const usersModel = require('../models/users.model')
const ROLES = require('../config/rolesConstants')

module.exports = {
    removeTimeZone(userId, timeZoneId) {
        return usersModel.findOneAndUpdate(
            { _id: userId },
            { $pull: { timeZones: { _id: timeZoneId } } },
            { new: true })
    },

    addTimeZone(userId, newTimeZone) {
        return usersModel.findOneAndUpdate(
            { _id: userId },
            { $push: { timeZones: newTimeZone } },
            { new: true })
    },

    updateTimeZone(_id, timeZoneId, updatedTimeZone) {
        return usersModel.findOneAndUpdate(
            { _id, "timeZones._id": timeZoneId },
            { $set: { "timeZones.$": updatedTimeZone } },
            { new: true }
        )
    },

    addNewUser(payload, role) {
        const newUser = new usersModel(payload)
        newUser.timeZones = []
        newUser.role = role
        return newUser.save(payload)
    },

    updateUserInfo(_id, email, name) {
        return usersModel.findOneAndUpdate({ _id }, { email, name }, { new: true })
    },
    
    updateRole(_id, role) {
        return usersModel.update({ _id }, { role })
    },

    getUserDetails(id) {
        return usersModel.findById(id).select('_id name email timeZones role').lean().populate('timeZones').exec()
    },

    getAllUsers({limit, skip}) {
        return usersModel.find().limit(limit).skip(skip).select('_id name email role').lean().exec()
    },

    getAllUsersCount() {
        return usersModel.find().count().exec()
    },

    getRegularUsers({limit, skip}) {
        return usersModel.find({ role: ROLES.regular }).limit(limit).skip(skip).select('_id name email').lean().exec()
    },

    getRegularUsersCount() {
        return usersModel.find({ role: ROLES.regular }).count().exec()
    },

    removeUser(id) {
        return usersModel.findByIdAndRemove(id)
    },

    async getUserRole(id) {
        return  (await usersModel.findById(id).select('role').lean().exec().catch(err=>{throw err})).role
    }

}

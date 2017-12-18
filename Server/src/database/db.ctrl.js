const usersModel = require('../models/users.model')
const ROLES = require('../config/rolesConstants')

module.exports = {
    async removeTimeZone(userId, timeZoneId) {
        return await usersModel.findOneAndUpdate(
            { _id: userId },
            { $pull: { timeZones: { _id: timeZoneId } } },
            { new: true })
    },

    async addTimeZone(userId, newTimeZone) {
        return await usersModel.findOneAndUpdate(
            { _id: userId },
            { $push: { timeZones: newTimeZone } },
            { new: true })
    },

    async updateTimeZone(_id, timeZoneId, updatedTimeZone) {
        return await usersModel.findOneAndUpdate(
            { _id, "timeZones._id": timeZoneId },
            { $set: { "timeZones.$": updatedTimeZone } },
            { new: true }
        )
    },

    async addNewUser(payload, role) {
        const newUser = new usersModel(payload)
        newUser.timeZones = []
        newUser.role = role
        return await newUser.save(payload)
    },

    async updateUserInfo(_id, email, name) {
        return await usersModel.findOneAndUpdate({ _id }, { email, name }, { new: true })
    },
    
    async updateRole(_id, role) {
        return await usersModel.update({ _id }, { role })
    },

    async getUserDetails(id) {
        return await usersModel.findById(id).select('_id name email timeZones role').lean().populate('timeZones').exec()
    },

    async getAllUsers() {
        return await usersModel.find().select('_id name email role').lean().exec()
    },

    async getRegularUsers() {
        return await usersModel.find({ role: ROLES.regular }).select('_id name email').lean().exec()
    },

    async removeUser(id) {
        return await usersModel.findByIdAndRemove(id)
    },

    async getUserRole(id) {
        return (await usersModel.findById(id).select('role').lean().exec()).role
    }

}

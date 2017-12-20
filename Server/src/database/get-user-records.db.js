const usersModel = require('../models/users.model')

module.exports = (id) => {
    return usersModel.findById(id).select('_id name email timeZones role').lean().populate('timeZones').exec()
}
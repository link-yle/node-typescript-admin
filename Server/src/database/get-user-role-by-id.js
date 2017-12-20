const usersModel = require('../models/users.model')

module.exports = async (id) => {
    return  (await usersModel.findById(id).select('role').lean().exec().catch(err=>{throw err})).role
}
const comparePassword = require('../services/compare-password').comparePassword
const usersModel = require('../models/users.model')


module.exports = async (_id, oldPassword, newPassword) => {
    const user = await usersModel.findOne({ _id }).catch(err => { throw err })
    if (!user) {
        const e = new Error()
        e.name = 'NoUserFound'
        throw e
    }
    if (oldPassword) {
        const ok = await comparePassword(oldPassword, user.password).catch(err => { throw err })
        if (!ok) throw Error('Wrong password')
    }
    user.password = newPassword
    return user.save()
}
const comparePassword = require('../services/compare-password').comparePassword
const usersModel = require('../models/users.model')


module.exports = async (_id, oldPassword, newPassword) => {
    const user = await usersModel.findOne({_id}).catch(err=>{throw err})
    if (!user) throw Error('User not found')
    const ok = await comparePassword(oldPassword, user.password).catch(err=>{throw err})
    if (!ok) throw Error('Wrong password')
    user.password = newPassword
    return user.save()
}
const usersModel = require('../models/users.model')


module.exports = async (email, recoveryCode, newPassword) => {
    const user = await usersModel.findOne({ email }).catch(err => { throw err })
    if (!user) {
        const e = new Error()
        e.name = 'NoUserFound'
        throw e
    }
    if (user.recoveryCode === recoveryCode) {
        user.password = newPassword
        return user.save()
    }
    else {
        const e = new Error()
        e.name = 'WrongRecoveryCode'
        throw e
    }

}
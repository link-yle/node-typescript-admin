const getUserByEmail = require('../data-layer/get-user-by-email')

module.exports = async (req, res, next) => {
    const user = await getUserByEmail(req.body.email).catch(err => { throw err })
    if (!user) return next({nF:'User'})
    if (user.recoveryCode === req.body.recoveryCode) {
        user.password = req.body.newPassword
        await user.save().catch(e=>next(e))
        return res.status(200).json({success: 'Your password has been updated successfully'})
    }
    else {
        const e = new Error()
        e.name = 'WrongRecoveryCode'
        throw e
    }
}




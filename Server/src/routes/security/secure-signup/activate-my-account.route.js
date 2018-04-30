
const getUserByEmail = require('../../../data-layer/get-user-by-email')

module.exports = async (req, res, next) => {
    try {
        const user = await getUserByEmail(req.body.email)
        if (!user){
            return next({ nF: 'User' })
        } else if (user.activationCode !== req.body.code) {
            return res.status(403).json({msg: 'Wrong activation code' })
        } else {
            user.activationCode = undefined
            user.active = true
            await user.save()
            return res.status(200).json({ success: 'Your account has been activated successfully' })
        }
    } catch (e) {
        return next(e)
    }


}
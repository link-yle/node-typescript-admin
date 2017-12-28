
const getUserByEmail = require('../data-layer/get-user-by-email')

module.exports = async (req, res, next) => {

    try {
        const user = await getUserByEmail(req.query.email)
        if (!user){
            return next({ nF: 'user' })
        } else if (user.activationCode !== req.query.activationCode) {
            return res.status(403).send({ error: 'Corrupt link' })
        } else {
            user.activationCode = undefined
            user.active = true
            await user.save()
            return res.status(200).send({ success: 'Your account has been activated successfully' })
        }
    } catch (e) {
        return next(e)
    }


}
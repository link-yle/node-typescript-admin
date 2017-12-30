const saveRecoveryCodeToDb = require('../../data-layer/save-recovery-code.db')
const generateRandomCode = require('../../services/generate-random-code').generateRandomCode
const mailer = require('../../services/mailer')

module.exports = async (req, res, next) => {
    const code = generateRandomCode()
    try {
        const user = await saveRecoveryCodeToDb(req.body.email, code)
        if(!user) return next({nF: 'User'})
        const link = `${req.body.route}?code=${code}&email=${req.body.email}`
        await mailer.sendEmailWithCode(req.body.email, link)
        return res.send({ success: 'An email has been sent with your recovery code' })
    } catch (e) {
        return next(e)
    }

}

const saveRecoveryCodeToDb = require('../../../data-layer/save-recovery-code.db')
const generateRandomCode = require('../../../services/generate-random-code').generateRandomCode
const mailer = require('../../../services/mailer')

module.exports = async (req, res, next) => {
    const code = generateRandomCode()
    try {
        const user = await saveRecoveryCodeToDb(req.body.email, code)
        if(!user) return res.status(404).json({msg: 'This email does not exist'})
        await mailer.sendEmailWithCode(req.body.email, code)
        return res.send({ success: 'An email has probably been sent with your recovery code' })
    } catch (e) {
        return next(e)
    }

}

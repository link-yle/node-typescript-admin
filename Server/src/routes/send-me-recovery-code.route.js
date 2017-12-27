const saveCodeToDb = require('../data-layer/save-recovery-code.db')
const generateRandomCode = require('../services/generate-random-code').generateRandomCode
const mailer = require('../services/mailer')

module.exports = async (req, res, next) => {
    const code = generateRandomCode()
    await saveCodeToDb(req.params.email, code).catch(e=> next(e))
    await mailer.sendEmailWithCode(req.params.email, code).catch(e=> next(e))
    return res.send({success: 'An email has been sent with your recovery code'})
}


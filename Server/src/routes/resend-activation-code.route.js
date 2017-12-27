const renewActivationCode = require('../data-layer/renew-activation-code')
const generateRanomCode = require('../services/generate-random-code'.generateRanomCode)
const sendActivationLink = require('../services/mailer').sendActivationLink

module.exports = async (req, res, next) => {
    const actiavtionCode = generateRanomCode()
    await renewActivationCode(req.body.email, actiavtionCode ).catch(err => {throw err})
    const link=`http://${req.get('host')}/activation?code=${actiavtionCode}&email=${req.body.email}`
    await sendActivationLink(req.body.email, link).catch(err=> next(err))
    // For privacy reasons we could not mention whether this email exists or not
    return res.status(200).send({success: 'The activation link should have been sent to the email you entered (in case it is already registered)'})
}

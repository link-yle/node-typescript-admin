
const addNewUser = require('../data-layer/add-new-user.db')
const generateRandomCode = require('../services/generate-random-code').generateRandomCode
const ROLES = require('../config/rolesConstants')
const clearUnneededDataFromPayload = require('../services/clear-unneeded-data')
const mailer = require('../services/mailer')


module.exports = async (req, res, next) => {
    const user = req.body.user
    user.activationCode = generateRandomCode()
    try{
        const addedUser = await addNewUser(user, ROLES.regular)
        const link=`${req.body.route}?code=${user.activationCode}&email=${user.email}`
        await mailer.sendActivationCode(user.email, link)
        return res.status(200).json(clearUnneededDataFromPayload(addedUser))
    } catch(e) {
        global.log.error(e)
        
        return next(e)
    }
    
}


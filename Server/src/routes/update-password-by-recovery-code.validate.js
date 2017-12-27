const Joi = require('Joi')
const passwordRegex = require('../config/regexConstants').passwordRegex

module.exports = (req, res, next) => {
    
    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        recoveryCode: Joi.string().length(20).required(),
        newPassword: Joi.string().regex(passwordRegex).required()
    })
    return Joi.validate(req.body, schema , (err) => next(err))
}

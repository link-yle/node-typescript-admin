const Joi = require('Joi')
const passwordRegex = require('../config/regexConstants').passwordRegex

module.exports =  (req, res, next) => {
    const schema = Joi.object().keys({
        name: Joi.string().min(3).max(20).required(),
        password: Joi.string().regex(passwordRegex).required(),
        email: Joi.string().email().required(),
        timeZones: Joi.array().empty()
    })
    return Joi.validate(req.body, schema , (err) => next(err))
}
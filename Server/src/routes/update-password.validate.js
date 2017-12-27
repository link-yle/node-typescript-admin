const Joi = require('Joi')
const passwordRegex = require('../config/regexConstants').passwordRegex

module.exports = (req, res, next) => {
    
    const schema = Joi.object().keys({
        oldPassword: req.decoded.role==='regular'? Joi.string().regex(passwordRegex).required() : null,
        newPassword: Joi.string().regex(passwordRegex).required(),
    })
    return Joi.validate(req.body, schema , (err) => next(err))
}

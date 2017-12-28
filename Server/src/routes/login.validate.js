const Joi = require('Joi')
const passwordRegex = require('../config/regexConstants').passwordRegex

module.exports = (req, res, next) => {
    const schema = Joi.object().keys({
        password: Joi.string().regex(passwordRegex).required().label('password'),
        email: Joi.string().email().required().label('email')
    })
    return Joi.validate(req.body, schema, (err) => next(err))
}
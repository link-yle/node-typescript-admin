const Joi = require('Joi')

module.exports = (req, res, next) => {
    const codeSchema = Joi.string().length(20).required().label('code')
    const emailSchema = Joi.string().email().required().label('email')
    Joi.validate(req.query.code, codeSchema , (err) => next(err))
    return Joi.validate(req.query.email, emailSchema , (err) => next(err))
}

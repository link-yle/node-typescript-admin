const Joi = require('joi')

module.exports = (req, res, next) => {
    const toValidate = {email: req.query.email, code: req.query.code}
    const schema = Joi.object().keys({
        email: Joi.string().email().required().label('email'),
        code: Joi.string().length(20).required().label('code'),
    })
    return Joi.validate(toValidate, schema , (err) => next(err))
}

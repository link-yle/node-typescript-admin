const Joi = require('Joi')

module.exports =  (req, res, next) => {
    const schema = Joi.object().keys({
        name: Joi.string().min(3).max(20).required(),
        email: Joi.string().email().required()
    })
    return Joi.validate(req.body, schema , (err) => next(err))
}
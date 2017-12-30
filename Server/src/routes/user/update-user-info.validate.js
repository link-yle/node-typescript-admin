const Joi = require('Joi')

module.exports =  (req, res, next) => {
    const schema = Joi.object().keys({
        name: Joi.string().min(3).max(20).required().label('name'),
        email: Joi.string().email().required().label('email')
    })
    return Joi.validate(req.body, schema , (err) => next(err))
}
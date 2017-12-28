const Joi = require('Joi')

module.exports = (req, res, next) => {
    const schema = Joi.object().keys({
        gmtTimeDifference: Joi.number().min(-12).max(14).required().label('gmt time difference'),
        name: Joi.string().min(3).max(20).required().label('name'),
        city: Joi.string().min(3).max(20).required().label('city'),
    })
    return Joi.validate(req.body, schema, (err) => next(err))
}
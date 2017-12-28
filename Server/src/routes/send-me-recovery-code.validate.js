const Joi = require('Joi')

module.exports = (req, res, next) => {
    const schema = Joi.string().email().required().label('email')
    return Joi.validate(req.params.email, schema, (err) => next(err))
}
const Joi = require('Joi')

module.exports =  (req, res, next) => {
    Joi.validate(req.body, req.schema, (err, value) => {
        if (err) return res.status(422).json(err)
        else next()
    });
}
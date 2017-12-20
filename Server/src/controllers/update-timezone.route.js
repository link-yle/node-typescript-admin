
const db = require('../update-timezone.db')
const Joi = require('Joi')


module.exports =  (req, res, next) =>{
    validate(req, res, next)
    return db(req.params.id, req.params.timeZoneId, req.body).catch(err=>next(err)).then(user=>res.status(200).json(user))
}


function validate(req, res, next) {
    req.schema = Joi.object().keys({
        gmtTimeDifference: Joi.number().min(-12).max(14).required(),
        name: Joi.string().min(3).max(20).required(),
        city: Joi.string().min(3).max(20).required(),
    })
    Joi.validate(req.body, req.schema, (err, value) => {
        if (err) return res.status(422).json(err)
        else next()
    });
}



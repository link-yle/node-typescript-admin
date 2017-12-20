const db = require('../database/add-record.db')
const Joi = require('Joi')
const validateRequestBody = require('../services/validate-request-body')



module.exports =  (req, res, next)=> {
    validate(req, res, next)
    return db.addTimeZone(req.params.id, req.body).catch(err=>next(err)).then(user=>res.status(200).json(user)) 
}


const validate = (req, res, next) =>  {
    req.schema = Joi.object().keys({
        gmtTimeDifference: Joi.number().min(-12).max(14).required(),
        name: Joi.string().min(3).max(20).required(),
        city: Joi.string().min(3).max(20).required(),
    })
    validateRequestBody(req, res, next)
}




const validateRequestBody = require('../services/validate-request-body')
const Joi = require('Joi')
const passwordRegex = require('../config/regexConstants').passwordRegex
const db = require('../database/update-passwrd-by-user-id.db')

module.exports = async (req, res, next) =>{
    validate(req, res)
    try{
        await db(req.params.id, req.body.oldPassword, req.body.newPassword)
        return res.status(200).send('Password updated')
    } catch (e){
        return next(e)
    }    
    
}




function validate(req, res, next) {
    req.schema = Joi.object().keys({
        oldPassword: Joi.string().regex(passwordRegex).required(),
        newPassword: Joi.string().regex(passwordRegex).required(),
    })
    validateRequestBody(req, res, next)
}

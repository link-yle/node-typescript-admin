const Joi = require('joi')
const { passwordRegex } = require('../config/regexConstants')
const ROLES = require('../config/rolesConstants')

const requiredNameSchema = Joi.string().min(3).max(20).required()

class InputValidator {
    
    static SignupPayloadSchema(req, res, next) {
        req.schema = Joi.object().keys({
            name: requiredNameSchema,
            password: Joi.string().regex(passwordRegex).required(),
            email: Joi.string().email().required()
        })
        validateSchema(req, res, next)
    
    }
    
    static LoginPayloadSchema(req, res, next) {
        req.schema = Joi.object().keys({
            password: Joi.string().regex(passwordRegex).required(),
            email: Joi.string().email().required()
        })
        validateSchema(req, res, next)
    }
    
    
    static InfoPayloadSchema(req, res, next) {
        req.schema = Joi.object().keys({
            name: requiredNameSchema,
            email: Joi.string().email().required()
        })
        validateSchema(req, res, next)
    }
    
    
    static TimeZonePayloadSchema(req, res, next) {
        req.schema = Joi.object().keys({
            gmtTimeDifference: Joi.number().min(-12).max(14).required(),
            name: requiredNameSchema,
            city: requiredNameSchema,
        })
        validateSchema(req, res, next)
    }
    
    
    static UpdateRolePayloadSchema(req, res, next) {
        req.schema = Joi.object().keys({
            role: Joi.string().valid(ROLES.admin, ROLES.manager, ROLES.regular),
        })
        validateSchema(req, res, next)
    }
}


function validateSchema(req, res, next) {
    Joi.validate(req.body, req.schema, (err, value) => {
        if (err) return res.status(422).json(err)
        else next()
    });
}


module.exports = InputValidator

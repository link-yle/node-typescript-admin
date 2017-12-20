const { getToken } = require('../core/authentication')
const comparePassword = require('../services/compare-password')
const validateRequestBody = require('../services/validate-request-body')
const Joi = require('Joi')
const passwordRegex = require('../config/regexConstants').passwordRegex
const apiResponseFactory = require('../services/api-response-factory')

module.exports = (req, res, next) => {
    validate(req, res, next)
    return db.getUser(req.body.email).then(user => {
        if (!user) return apiResponseFactory.resourceNotFound('user')
        return comparePassword(req.body.password, user.password).then(ok => {
            if (!ok) return res.status(401).send('Invalid credentials')
            user.password = undefined
            return res.status(200).send({ user: user, token: getToken(user._id, user.role) })
        }).catch(err => next(err))
    })
}



const validate = (req, res, next) => {
    req.schema = Joi.object().keys({
        password: Joi.string().regex(passwordRegex).required(),
        email: Joi.string().email().required()
    })
    validateRequestBody(req, res, next)
}



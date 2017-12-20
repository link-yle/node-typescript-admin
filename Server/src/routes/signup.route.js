
const db = require('../database/add-new-user.db')
const ROLES = require('../config/rolesConstants')
const { passwordRegex } = require('../config/regexConstants')
const Joi = require('Joi')
const validateRequestBody = require('../services/validate-request-body')


module.exports = (req, res, next) => {
    validate(req, res, next)
    return db.addNewUser(req.body, ROLES.regular).then(added => res.status(200).json(R.dissoc('password', added))).catch(e => next(e))
}




const validate = (req, res, next) => {
    req.schema = Joi.object().keys({
        name: Joi.string().min(3).max(20).required(),
        password: Joi.string().regex(passwordRegex).required(),
        email: Joi.string().email().required(),
        timeZones: Joi.array().empty()
    })
    validateRequestBody(req, res, next)
}
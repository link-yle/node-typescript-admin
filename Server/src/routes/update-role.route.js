const ROLES = require('../config/rolesConstants')
const apiResponseFactory = require('../services/api-response-factory')
const validateRequestBody = require('../services/validate-request-body')
const db = require('../data-layer/update-role.db')
const Joi = require('Joi')

module.exports = (req, res, next) => {
    validate(req, res, next)
    return db(req.params.id, req.body.role).then(user => user ? res.status(200).json(user) : apiResponseFactory.resourceNotFound('user'))
        .catch(err => next(err))

}




const validate = (req, res, next) =>{
    req.schema = Joi.object().keys({
        role: Joi.string().valid(ROLES.admin, ROLES.manager, ROLES.regular),
    })
    validateRequestBody(req, res, next)
}

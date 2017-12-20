
const ROLES = require('../../config/rolesConstants')
const db = require('./update-role.db')
const utility = require('../../helpers/utility')
const Joi = require('Joi')
const validateRequestBody = require('../../core/input-validator')

module.exports = (req, res, next) => {
    validate(req, res, next)
    return db(req.params.id, req.body.role).then(user => user ? res.status(200).json(user) : utility.resourceNotFound('user'))
        .catch(err => next(err))

}




const validate = (req, res, next) =>{
    req.schema = Joi.object().keys({
        role: Joi.string().valid(ROLES.admin, ROLES.manager, ROLES.regular),
    })
    validateRequestBody(req, res, next)
}

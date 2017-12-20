const db = require('../database/update-user-info.db')
const Joi = require('Joi')
const validateRequestBody = require('../services/validate-request-body')


module.exports = (req, res, next) => {
    validate(req, res, next)
    return db.updateUserInfo(req.params.id, req.body.email, req.body.name).then(user => res.status(200).json(user))
        .catch(err => next(err))

}


const validate = (req, res, next) => {
    req.schema = Joi.object().keys({
        name: Joi.string().min(3).max(20).required(),
        email: Joi.string().email().required()
    })
    validateRequestBody(req, res, next)
}

const { getToken } = require('../core/authentication')
const comparePassword = require('../services')

module.exports = (req, res, next) => {
    validate(req, res, next)
    return db.getUser(req.body.email).then(user => {
        if (!user) return utility.resourceNotFound('user')
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
    validateSchema(req, res, next)
}


module.exports =  (req, res, next) => {
    Joi.validate(req.body, req.schema, (err, value) => {
        if (err) return res.status(422).json(err)
        else next()
    });
}
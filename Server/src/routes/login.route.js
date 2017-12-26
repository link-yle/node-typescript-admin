const { getToken } = require('../core/authentication')
const comparePassword = require('../services/compare-password')
const apiResponseFactory = require('../services/api-response-factory')

module.exports = (req, res, next) => {
    return db.getUser(req.body.email).then(user => {
        if (!user) return apiResponseFactory.resourceNotFound('user')
        return comparePassword(req.body.password, user.password).then(ok => {
            if (!ok) return res.status(401).send('Invalid credentials')
            user.password = undefined
            return res.status(200).send({ user: user, token: getToken(user._id, user.role) })
        }).catch(err => next(err))
    })
}







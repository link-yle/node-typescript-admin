const { getToken } = require('../core/authentication')
const comparePassword = require('../services/compare-password').comparePassword
const getUserByEmail = require('../data-layer/get-user-by-email')

module.exports = (req, res, next) => {
    return getUserByEmail(req.body.email).then(user => {
        if (!user) return next({nf: 'user'})
        return comparePassword(req.body.password, user.password).then(ok => {
            if (!ok) return res.status(401).send('Invalid credentials')
            user.password = undefined
            return res.send({ user: user, token: getToken(user._id, user.role) })
        }).catch(err => next(err))
    })
}







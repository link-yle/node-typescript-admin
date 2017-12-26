const { getToken } = require('../core/authentication')
const comparePassword = require('../services/compare-password').comparePassword
const getUserByEmail = require('../data-layer/get-user-by-email')

module.exports = (req, res, next) => {
    let loginErr = new Error('Email or/and password are wrong')
    return getUserByEmail(req.body.email).then(user => {
        if (!user) return res.status(401).json({error: loginErr.message})
        return comparePassword(req.body.password, user.password).then(ok => {
            if (!ok) return res.status(401).json({error: loginErr.message})
            user.password = undefined
            return res.send({ user: user, token: getToken(user._id, user.role) })
        }).catch(err => next(err))
    })
}







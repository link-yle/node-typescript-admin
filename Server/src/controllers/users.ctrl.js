
const utility = require('../helpers/utility.js')
const { getToken } = require('../core/authentication')
const ROLES = require('../config/rolesConstants')
const db = require('../database/db.ctrl')
const R = require('ramda')
process.on('unhandledRejection', up => { throw up })
const bcrypt = require('bcrypt')


function signup(req, res, next) {
    return db.addNewUser(req.body, ROLES.regular).then(added => res.status(200).json(R.dissoc('password', added))).catch(e => next(e))
}




function login(req, res, next) {
    return db.getUser(req.body.email).then(user => {
        if (!user) return utility.resourceNotFound('user')
        return comparePassword( req.body.password, user.password).then(ok => {
            if (!ok) return res.status(401).send('Invalid credentials')
            user.password = undefined
            return res.status(200).send({user: user, token: getToken(user._id, user.role)})
        }).catch(err => next(err))
    })
}


function findUserAndUpdateInfo(req, res, next) {
    return db.updateUserInfo(req.params.id, req.body.email, req.body.name).then(user => res.status(200).json(user))
        .catch(err => next(err))

}

function findUserAndUpdateRole(req, res, next) {
    return db.updateRole(req.params.id, req.body.role).then(user => user ? res.status(200).json(user) : utility.resourceNotFound('user'))
        .catch(err => next(err))

}


function getUserDetails(req, res, next) {
    return db.getUserDetails(req.params.id).then(x => res.status(200).json(x)).catch(err => next(err))
}

function getUsers(req, res, next) {
    let promise
    const query = { limit: 10, skip: parseInt(req.query.skip) }
    if (req.decoded.role === ROLES.manager) {
        promise = Promise.all([db.getRegularUsers(query), db.getRegularUsersCount()])
    } else {
        promise = Promise.all([db.getAllUsers(query), db.getAllUsersCount()])
    }
    return promise.then(([users, count]) => res.status(200).json({ users, count })).catch(err => next(err))
}

function removeUser(req, res, next) {
    return db.removeUser(req.params.id).then(() => res.status(200).json("Ok")).catch(err => next(err))
}

const comparePassword = (toBeExaminedPassword, realPassword) => new Promise((res, rej) =>
    bcrypt.compare(toBeExaminedPassword, realPassword, (err, isMatch) => err ? rej(err) : res(isMatch)))

module.exports = { signup, login, getUserDetails, removeUser, getUsers, findUserAndUpdateRole, findUserAndUpdateInfo }
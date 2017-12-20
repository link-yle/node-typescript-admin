
const utility = require('../helpers/utility.js')
const usersModel = require('../models/users.model')
const { getToken } = require('../core/authentication')
const ROLES = require('../config/rolesConstants')
const db = require('../database/db.ctrl')
process.on('unhandledRejection', up => { throw up })

function signup(req, res, next) {
    return db.addNewUser(req.body, ROLES.regular).then(added => {
        delete added.password
        return res.status(200).json(added)
    }).catch(e => next(e))
}



function login(req, res) {
    return usersModel.findOne({ email: req.body.email }, (err, user) => {
        if (err) throw err;
        if (!user) return utility.notFound(res, 'user')
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (err) return res.status(400).json('An error occurred while trying to check your password')
            if (!isMatch) return res.status(403).json('Wrong password')
            const token = getToken(user._id, user.role, process.env.secret)
            user.password = undefined
            return res.status(200).json({ user, token })
        });
    })
}


function findUserAndUpdateInfo(req, res, next) {
    return db.updateUserInfo(req.params.id, req.body.email, req.body.name).then(user => res.status(200).json(user))
        .catch(err => next(err))

}

function findUserAndUpdateRole(req, res, next) {
    return db.updateRole(req.params.id, req.body.role).then(user => {
        if (!user) return utility.resourceNotFound('user')
        return res.status(200).json(user)
    }).catch(err => next(err))

}


function getUserDetails(req, res, next) {
    return db.getUserDetails(req.params.id).then(x=>res.status(200).json(x)).catch(err => next(err))
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
    return db.removeUser(req.params.id).then(()=>res.status(200).json("Ok")).catch(err => next(err))
}



module.exports = { signup, login, getUserDetails, removeUser, getUsers, findUserAndUpdateRole, findUserAndUpdateInfo }
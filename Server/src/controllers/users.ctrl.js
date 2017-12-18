
const utility = require('../helpers/utility.js')
const usersModel = require('../models/users.model')
const { getToken } = require('../core/authentication')
const ROLES = require('../config/rolesConstants')
const db = require('../database/db.ctrl')

async function signup(req, res) {
    const added = await db.addNewUser(req.body, ROLES.regular).catch(err => {
        if (err.code === 11000 && err.index === 0) return res.status(409).json('Email already exists')
        else return utility.badRequest(res, 'signup you')
    })
    delete added.password
    return res.status(200).json(added)
}



function login(req, res) {
    usersModel.findOne({ email: req.body.email }, (err, user) => {
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


async function findUserAndUpdateInfo(req, res) {
    const user = await db.updateUserInfo(req.params.id,req.body.email, req.body.name)
    .catch(err => utility.badRequest(res, 'save updated info'))
    return res.status(200).json(user)
}

async function findUserAndUpdateRole(req, res) {
    const user = db.updateRole(req.params.id, req.body.role).catch(err => utility.badRequest(res, 'save updated role'))
    if (!user) return utility.notFound(res, 'user')
    return res.status(200).json(user)
}


async function getUserDetails(req, res) {
    const user = await db.getUserDetails(req.params.id).catch(err => utility.badRequest(res, err))
    return res.status(200).json(user)

}

async function getUsers(req, res) {
    let users
    if (req.decoded.role === ROLES.manager) {
        users = await db.getRegularUsers().catch(err => res.status(500).json("An error occurred while retrieving users"))
    } else {
        users = await db.getAllUsers().catch(err => res.status(500).json("An error occurred while retrieving users"))
    }
    return res.status(200).json(users)
}

async function removeUser(req, res) {
    await db.removeUser(req.params.id).catch(err => res.status(400).json(err))
    return res.status(200).json("Ok")
}



module.exports = { signup, login, getUserDetails, removeUser, getUsers, findUserAndUpdateRole, findUserAndUpdateInfo }
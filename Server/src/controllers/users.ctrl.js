
const utility = require('../helpers/utility.js')
const usersModel = require('../models/users.model')
const { getToken } = require('../core/authentication')
const ROLES = require('../config/rolesConstants')

async function signup(req, res) { 
    const newUser = new usersModel(req.body)
    newUser.timeZones = []
    newUser.role = ROLES.regular
    const added = await newUser.save(req.body).catch(err => {
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


function findUserAndUpdateInfo(req, res) {
    return usersModel.findOneAndUpdate(
        { _id: req.params.id },
        { email: req.body.email, name: req.body.name },
        { new: true }
    )
        .then(user => {
            return res.status(200).json(user)
        })
        .catch(err => {
            return utility.badRequest(res, 'save updated info')
        })
}

function findUserAndUpdateRole(req, res) {
    const id = req.params.id
    return usersModel.update({ _id: id }, { role: req.body.role })
        .then((user => {
            if (!user) return utility.notFound(res, 'user')
            res.status(200).json(user)
        }))
        .catch(err => {
            console.log(err)

            utility.badRequest(res, 'save updated role')
        })
}


function getUserDetails(req, res) {
    const id = req.params.id
    return usersModel.findById(id).select('_id name email timeZones role').lean().populate('timeZones').exec()
        .then((user) => res.status(200).json(user))
        .catch(err => utility.badRequest(res, err))
}

function getUsers(req, res) {
    let query
    if (req.decoded.role === ROLES.manager) query = usersModel.find({ role: ROLES.regular })
    else query = usersModel.find()
    return query.select('_id name email role').lean().exec()
        .then(users => {
            return res.status(200).json(users)
        })
        .catch(err => res.status(500).json("An error occurred while retrieving users"))
}

function removeUser(req, res) {
    return usersModel.findByIdAndRemove(req.params.id)
        .then(() => {
            return res.status(200).json("Ok")
        })
        .catch(err => res.status(400).json(err))
}



module.exports = { signup, login, getUserDetails, removeUser, getUsers, findUserAndUpdateRole, findUserAndUpdateInfo }
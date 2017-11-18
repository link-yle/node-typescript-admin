
const utility = require('../helpers/utility.js')
const usersModel = require('../models/users.model')
const {getToken} = require('../core/authentication')
const {userSecret} = require('../config/commonConstants')


function signup(req, res) {
    const newUser = new usersModel(req.body)
    newUser.save(req.body)
        .then(added => {
            return res.status(200).json(added)
        })
        .catch(err => {
            if (err.code===11000 && err.index===0) return res.status(409).json('Email already exists')
            else return res.status(400).json(err)
        })
}



function login(req, res) {
    usersModel.findOne({ email: req.body.email }, (err, user) => {
        if (err) throw err;
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (err) return res.status(400).send('An error occurred while trying to check your password')
            if(!isMatch) return res.status(403).send('Wrong password')
            const token = getToken(user._id, user.role, req.app.get(userSecret))
            user.password = undefined
            return res.status(200).json({user, token})
        });
    })
}


function findUserAndUpdateInfo(req, res) {
    if (!req.params._id) utility.missingData(res, '_id')
    return usersModel.findById(req.params._id)
        .then((user) => {
            user.name = req.body.name
            user.email = req.body.email
            user.save().then((err, user) => {
                return res.status(200).json(user)
            })
            .catch(err=>{
                if (err.code===11000 && err.index===0) return res.status(409).json('Email already exists')
                return utility.badRequest(res, 'save updated info')
            })

        })
        .catch(err => utility.badRequest(res, err))
}

function findUserAndUpdateRole(req, res) {
    if (!req.params._id) utility.missingData(res, '_id')
    return usersModel.findById(req.params._id)
        .then((user) => {
            user.role = req.body.role
            user.save().then((err, user) => {
                if (err) return utility.badRequest(res, 'save updated role')
                return res.status(200).json(user)
            })

        })
        .catch(err => utility.badRequest(res, err))
}


function getUser(req, res) {
    if (!req.params._id) utility.missingData(res, '_id')
    return usersModel.findById(req.params._id).lean().exec()
        .then((user) => res.status(200).json(user))
        .catch(err => utility.badRequest(res, err))
}

function getUsers() {
    return usersModel.find().select('_id name email timeZones role').lean().exec()
}

function removeUser(req, res) {
    return usersModel.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(200).json("Ok")
        })
        .catch(err => utility.badRequest(res, 'to remove user'))
}



module.exports = { signup, login, getUser, removeUser, getUsers, findUserAndUpdateRole, findUserAndUpdateInfo }
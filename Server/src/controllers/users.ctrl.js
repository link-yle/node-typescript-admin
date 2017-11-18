
const utility = require('../helpers/utility.js')
const usersModel = require('../models/users.model')
const { getToken } = require('../core/authentication')
const { userSecret } = require('../config/commonConstants')


function signup(req, res) {
    const newUser = new usersModel(req.body)
    newUser.timeZones = []
    newUser.role = 'regular'
    newUser.save(req.body)
        .then(added => {
            return res.status(200).json(added)
        })
        .catch(err => {
            if (err.code === 11000 && err.index === 0) return res.status(409).json('Email already exists')
            else return res.status(400).json(err)
        })
}



function login(req, res) {
    usersModel.findOne({ email: req.body.email }, (err, user) => {
        if (err) throw err;
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (err) return res.status(400).send('An error occurred while trying to check your password')
            if (!isMatch) return res.status(403).send('Wrong password')
            const token = getToken(user._id, user.role, req.app.get(userSecret))
            user.password = undefined
            return res.status(200).json({ user, token })
        });
    })
}


function findUserAndUpdateInfo(req, res) {
    const id = req.params.id
    return usersModel.findOne({ _id: id }).exec((err, user) => {
        if (err) return utility.badRequest(res, err)
        if (!user) utility.notFound(res, 'user')
        user.name = req.body.name
        user.email = req.body.email
        user.password = undefined
        return res.status(200).send(user)
        user.save().then((err, user) => {
            return res.status(200).json(user)
        })
            .catch(err => {
                if (err.code === 11000 && err.index === 0) return res.status(409).json('Email already exists')
                return utility.badRequest(res, 'save updated info')
            })
    })
}

function findUserAndUpdateRole(req, res) {
    const id = req.params.id
    return usersModel.update({ _id: id }, { role: req.body.role })
        .then((user => res.status(200).json(user)))
        .catch(err => {
            console.log(err)

            utility.badRequest(res, 'save updated role')
        })
}


function getUserDetails(req, res) {
    const id = req.params._id
    return usersModel.findById(id).select('_id name email timeZones role').lean().exec()
        .then((user) => res.status(200).json(user))
        .catch(err => utility.badRequest(res, err))
}

function getUsers(req, res) {
    return usersModel.find().select('_id name email role').lean().exec()
    .then(users=>{
        return res.status(200).json(users)
    })
    .catch(err=>console.log(err)
    )
}

function removeUser(req, res) {
    return usersModel.findByIdAndRemove(req.params.id)
        .then(() => {
            return res.status(200).json("Ok")
        })
        .catch(err => res.status(400).send(err))
}



module.exports = { signup, login, getUserDetails, removeUser, getUsers, findUserAndUpdateRole, findUserAndUpdateInfo }
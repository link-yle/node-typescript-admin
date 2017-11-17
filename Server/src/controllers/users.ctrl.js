
const utility = require('../helpers/utility.js')
const { findOneAndUpdate, add, remove, getOneById } = require('../query/donors.query.js')
const usersModel = require('../models/donors.model')





function addUser(req, res) {
    const newUser = new usersModel(req.body)
    newUser.save(req.body)
        .then((added) => {
            return res.status(200).json(added)
        })
        .catch(err => utility.badRequest(res, 'to add your info'))
}



function login(req, res) {
    usersModel.findOne({ email: req.body.email }, (err, user) => {
        if (err) throw err;
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (err) throw err;
            console.log(isMatch)
            return res.staus.json(user)
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
                if (err) return utility.badRequest(res, 'save updated info')
                return res.status(200).json(user)
            })

        })
        .catch(err => utility.badRequest(res, err))
}

function findUserAndUpdateAndAssignRole(req, res) {
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



function removeUser(req, res) {
    return usersModel.remove(req.params.id)
        .then(() => {
            res.status(200).json("Ok")
        })
        .catch(err => utility.badRequest(res, 'to remove user'))
}

function getDonorInfoById(req, res) {
    return getOneById(req.params.id)
        .then((item) => res.status(200).json(item))
        .catch(err => utility.badRequest(res, 'to add your info'))
}


module.exports = { addUser, login, getUser, removeUser, getDonorInfoById }
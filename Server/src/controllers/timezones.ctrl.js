

const utility = require('../helpers/utility.js')
const usersModel = require('../models/users.model')

function removeTimeZone(req, res) {
    return usersModel.findByIdAndUpdate(
        { _id: req.params.id },
        { $pull: { timeZones: { _id: req.params.id } } },
        { safe: true }
    )
        .then(() => {
            res.status(200).json("Ok")
        })
        .catch(err => utility.badRequest(res, 'to remove timeZone'))
}

function addTimeZone(req, res) {
    return usersModel.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { timeZones: req.body } })
        .then((err, user) => {
            if (err) return utility.badRequest(res, 'to add timeZone')
            return res.status(200).json(user)
        })
        .catch(err => utility.badRequest(res, 'to add timeZone'))
}

function updateTimeZone(req, res) {
    return usersModel.findOneById(x)
        .then((err, user) => {
            user.timeZones[user.timeZones.findIndex(timeZone => timeZone._id === req.params._id)] = req.body
            user.save().then((err, user) => {
                if (err) return utility.badRequest(res, 'to update timeZone')
                return res.status(200).json(user)
            })
        })
        .catch(err => utility.badRequest(res, 'to remove timeZone'))
}

module.exports = {updateTimeZone, addTimeZone, removeTimeZone}
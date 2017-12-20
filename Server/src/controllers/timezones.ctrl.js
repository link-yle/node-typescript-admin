const utility = require('../helpers/utility.js')
const db = require('../database/db.ctrl')

function removeTimeZone(req, res, next) {
    return db.removeTimeZone(req.params.id, req.params.timeZoneId)
    .then(update=> update ?  res.status(200).json(update) : next(utility.resourceNotFound('timezone')))
    .catch(err=>next(err))
}

function addTimeZone(req, res, next) {
    return db.addTimeZone(req.params.id, req.body).catch(err=>next(err)).then(user=>res.status(200).json(user)) 
}

function updateTimeZone(req, res, next) {
    return db.updateTimeZone(req.params.id, req.params.timeZoneId, req.body).catch(err=>next(err)).then(user=>res.status(200).json(user))
}

module.exports = { updateTimeZone, addTimeZone, removeTimeZone }
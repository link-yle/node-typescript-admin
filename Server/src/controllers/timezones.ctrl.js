const utility = require('../helpers/utility.js')
const db = require('../database/db.ctrl')

async function removeTimeZone(req, res) {
    const update = await db.removeTimeZone(req.params.id, req.params.timeZoneId)
    if (!update) return utility.notFound('Users')
    return res.status(200).json(update)
}

async function addTimeZone(req, res) {
    const user = await db.removeTimeZone(req.params.id, req.body)
    .catch(err => utility.badRequest(res, 'to add timeZone'))
    return res.status(200).json(user)
}

async function updateTimeZone(req, res) {
    const user = await db.updateTimeZone(req.params.id, req.params.timeZoneId, req.body)
    .catch(err => utility.badRequest(res, 'to remove timeZone'))
    return res.status(200).json(user)
}

module.exports = { updateTimeZone, addTimeZone, removeTimeZone }
const utility = require('../../helpers/utility')
const db = require('../remove-timezone.db')

module.exports = (req, res, next) => {
    return db.removeTimeZone(req.params.id, req.params.timeZoneId)
    .then(update=> update ?  res.status(200).json(update) : next(utility.resourceNotFound('timezone')))
    .catch(err=>next(err))
}
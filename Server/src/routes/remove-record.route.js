const apiResponseFactory = require('../services/api-response-factory')
const db = require('../database/remove-record.db')

module.exports = (req, res, next) => {
    return db.removeTimeZone(req.params.id, req.params.timeZoneId)
    .then(update=> update ?  res.status(200).json(update) : next(apiResponseFactory.resourceNotFound('timezone')))
    .catch(err=>next(err))
}
const removeRecord = require('../../data-layer/remove-record.db')

module.exports = (req, res, next) => {
    return removeRecord(req.params.id, req.params.timeZoneId)
    .then(update=> update ?  res.status(200).json(update) : next({nF: 'timezone'}))
    .catch(err=>next(err))
}
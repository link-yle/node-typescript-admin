const addRecord = require('../../data-layer/add-record.db')


module.exports = (req, res, next) => {
    return addRecord(req.params.id, req.body).catch(err => next(err)).then(user => res.status(200).json(user))
}

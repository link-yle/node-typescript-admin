const db = require('../database/get-user-records')

module.exports = (req, res, next) => {
    return db(req.params.id).then(x => res.status(200).json(x)).catch(err => next(err))
}

const db = require('../../data-layer/update-record.db')

module.exports =  (req, res, next) =>{
    return db(req.params.id, req.params.timeZoneId, req.body).catch(err=>next(err)).then(user=>res.status(200).json(user))
}


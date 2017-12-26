
const db = require('../data-layer/update-passwrd-by-user-id.db')

module.exports = async (req, res, next) =>{
    try{
        await db(req.params.id, req.body.oldPassword, req.body.newPassword)
        return res.status(200).send('Password updated')
    } catch (e){
        return next(e)
    }    
    
}





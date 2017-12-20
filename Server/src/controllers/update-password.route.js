

async function updateMyPassword(req, res, next) {
    validate(req, res)
    try{
        await db.updateMyPassword(req.params.id, req.body.oldPassword, req.body.newPassword)
        return res.status(200).send('Password updated')
    } catch (e){
        return next(e)
    }    
    
}






function validate(req, res) {
    req.schema = Joi.object().keys({
        oldPassword: Joi.string().regex(passwordRegex).required(),
        newPassword: Joi.string().regex(passwordRegex).required(),
    })
    Joi.validate(req.body, req.schema, (err, value) => {
        if (err) return res.status(422).json(err)
        else return 
    });
}

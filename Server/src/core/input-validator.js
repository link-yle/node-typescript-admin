const Joi = require('joi')
const { passwordRegex } = require('../config/regexConstants')
const ROLES = require('../config/rolesConstants')

const requiredNameSchema = Joi.string().min(3).max(20).required()

class InputValidator {
    
    
    
   
    
    
    
    
    
    
    

    
}



module.exports =  (req, res, next) => {
    Joi.validate(req.body, req.schema, (err, value) => {
        if (err) return res.status(422).json(err)
        else next()
    });
}


module.exports = InputValidator

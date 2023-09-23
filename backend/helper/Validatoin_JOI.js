
/// we can validate our data with joi module which make as chec validation for req.body data easy ;
/// we make this an  helper function use it where there is a need of it else we seperated the code to reuse it
const Joi = require('joi')
const Validation = {}

// signup Validation

Validation.singup = function (req,res,next){
    const Schema = Joi.object({
        username : Joi.string().required(),
        email: Joi.string().email({tlds:{allow:true}}).required(),
        password: Joi.string().required(),
        confirmPassword: Joi.string().required()
    })

    const ValidationRes = Schema.validate(req.body)
    if(ValidationRes.error){
       return res.status(400).json({error: true,status: false,message: 'invalid validation '})
    }

    next();
}

// login validation
Validation.login = function (req,res,next){
    const Schema = Joi.object({
    
        email: Joi.string().email({tlds:{allow:true}}).required(),
        password: Joi.string().required()
  
    })

    const ValidationRes = Schema.validate(req.body)
    if(ValidationRes.error){
       return res.status(400).json({error: true,status: false,message: 'invalid validation '})
    }

    next();
}


module.exports = Validation;
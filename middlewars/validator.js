const {body,validationResult} =require("express-validator");

const registerRules = ()=>[
    body("name","name is required").notEmpty(),
    body("lastName","last name is required").notEmpty(),
    body("email","email sould be mail").isEmail(),
    body("password","password most contain min 5 carc").isLength({
        min:5,
        max:20
    })]

const loginRules = ()=>[
    body("email","email sould be mail").isEmail(),
    body("password","password most contain min 5 carc").isLength({
        min:5,
        max:20
    })
]

const validator = (req,res,next) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).send({errors:errors.array()})
        return ; 
    }
        next()
}

module.exports = {validator,registerRules,loginRules}
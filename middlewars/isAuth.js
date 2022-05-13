var jwt = require('jsonwebtoken');
//import model
const User = require("../models/User");
//import dotenv
require("dotenv").config({path:"../config/.env"});

const isAuth = async (req,res,next) =>{
    try {
        const token = req.headers['x-auth-token']
        if(!token){
            return res.status(400).send({msg:"no token unauthorized"})
        }
        const decoded = await jwt.verify(token,process.env.mySecret)

        //Get User By Id 
        const user =await User.findById(decoded.id)
        //check User
        if(!user){
            return res.status(400).send({msg:"unauthorized"})
        }
        //get user
        req.user = user
        next()
    } catch (error) {
        return res.status(500).send({msg:"server error"})
    }
}

module.exports = isAuth
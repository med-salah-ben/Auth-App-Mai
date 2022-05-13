const router = require('express').Router();
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
require("dotenv").config({path:"../config/.env"})
const User = require('../models/User');
const {registerRules,loginRules,validator} =require("../middlewars/validator")
const isAuth = require("../middlewars/isAuth")

//test router
router.get("/test",(req,res)=>{
    res.send("hello world!!!")
})

const testUser =async (email)=>{
 
    return User.findOne(email)
   
};

router.post("/register",registerRules(),validator,async(req,res)=>{
    const {name , email , lastName,password} = req.body ;
    console.log(req.body)
    try {
        //simple validation
        // if(!name || !email || !password){
        //     return res.status(400).send({msg:"please enter all required fields"});
        // }
        //check for existing user 
        let user = await testUser({email})
        console.log(user)
        if(user){
            return res.status(400).send({msg:"user already exist"});
        }else{
        //create new user
        user = new User({name,lastName,email,password});
        // create hash and salt
        const salt = 10 ; 
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword ;
        await user.save();

        const payload = {
            id:user._id
        }
        const token = await jwt.sign(payload,process.env.mySecret,{ expiresIn: '1h' })
        res.status(200).send({msg:"User Register With Success",user,token})
            }
    } catch (error) {
        res.status(500).send({msg:"Register server errors"});
        console.log(error)
    }
});

//Login user

router.post('/login',loginRules(),validator,async(req,res)=>{
    const {email,password} = req.body ;
    try {
        //check 1
        // if(!email || !password){
        //     return res.status(400).send({msg:"please enter all fields"})
        // }
        //check 2 
        let user = await User.findOne({email})
        // console.log(user)
        if(!user){
            return res.status(400).send({msg:"user does not exist"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).send({msg:"Bad Credentials"})
        }
        const payload = {
            id:user._id
        }
        console.log(process.env.mySecret)

        const token = await jwt.sign(payload,process.env.mySecret,{ expiresIn: '1h' })
        res.status(200).send({msg:"logged with success", user,token})
    } catch (error) {
        res.status(500).send({msg:"login server error",error:error})
    }
})

router.get('/user',isAuth,(req,res)=>{
    res.status(200).send({user:req.user})
})

module.exports = router
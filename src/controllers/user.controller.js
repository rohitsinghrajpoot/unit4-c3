const express = require("esxpress")

const User = require("../models/user.model")
const { body, validationResult } = require('express-validator');
const { notify } = require("..");
const router = express.Router()

router.post("/",
   body("firstaName").
   not().isEmpty().isLength({min:3,max:30}),
   body("lastName").
   not().isEmpty().isLength({min:3,max:30}),
   body("age").
   not().isEmpty().custom((val)=>{
       if(val<1||val>150){
           throw new Error("age should be bertween 1 and 150")
       }
       return true
   }),
   body("email").isEmpty().
   custom(async, (val)=>{
       const user = await User.findOne({email:val})
       if(user){
           throw new Error("email is already taken")
       }
       return true
   }),






async (req,res)=>{
    try{
        const users = await User.create(req.body)

        return res.status(201).send(users)
    }catch (err){
    return res.status(500).send({msg:err.msg})
    }
  
})
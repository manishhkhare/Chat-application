const express = require('express');
const { Usermodel } = require('../cofig/db');
const loginRoute = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

loginRoute.all('/login', async (req, res) => {
    
     await Usermodel.findOne({email:req.body.email})
       .then(response=>{
        if(response === null){
            res.status(404).json({
             msg:'invailid credantial'
            })
        } else{
            const loginpassword = req.body.password;
            const hashSync = response.password
            const token = jwt.sign({email:req.body},process.env.SECRETE_KEY)
             // console.log(loginpassword,'login',response.password)
           if(bcrypt.compareSync(loginpassword,hashSync)){
               res.status(200).json({
                msg:'welcome',token

               })
           }else{
            res.status(404).json({
                msg:'invailid credantial'
               })
           }

        }
     }).catch(err=>{
        console.log(err)
     })


});

module.exports = loginRoute;
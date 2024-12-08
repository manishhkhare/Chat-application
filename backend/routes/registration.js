const express = require('express');
const { Usermodel } = require('../cofig/db');
const registrationRoute = express.Router();
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSalt(10);

registrationRoute.all('/registration', async (req, res) => {
  
    const result = await Usermodel.findOne({email:req.body.email}) // find the email in db
    
 
    if(result === null){

        const hash_passowrd = await bcrypt.hashSync(req.body.password) // generate encoded password
        console.log(hash_passowrd)
        const newUser = new Usermodel({  // craete new newuser
            fullname:req.body.fullname,
            email:req.body.email,
            password:hash_passowrd
           
        })
        //console.log(result)
        newUser.save().then(result=>{ // and save
            res.status(200).send({
                msg: "user registration done !!",
                 
            });
        }).catch(err=>{
            res.status(403).send({
                msg: err,
                status:403
        })
    }) 
    }else{
        res.status(403).send({
            msg: 'user allready exist',
            status:403
    })

       }
   
       
  
   
        });
   


  

module.exports = registrationRoute;
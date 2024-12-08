const express = require('express');
const { Usermodel } = require('../cofig/db');
const checkingRoute = express.Router();

checkingRoute.all('/chakingInformation',async (req,res)=>{
 
   await Usermodel.findOne({email:req.body.UserEmail,
                           // fullname:req.body.UserName
    })
                    .then(response=>{
                        if(response === null){
                            res.status(404).json({
                                msg:'not-found'
                               }) 
                           
                        }else{
                            
                            res.status(200).json({
                             msg:'done',
                             data:response
                           
                            }) }
                    }).catch(err=>{
                                console.log(err)
                             })
    //                  // console.log(result.tree)
    // res.status(200).json({
    //     msg:'okk'
    // })
})

module.exports = { checkingRoute }
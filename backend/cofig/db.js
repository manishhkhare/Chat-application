const express = require('express');
const { default: mongoose } = require('mongoose');

  mongoose.connect('mongodb://localhost:27017/',)

    .then((d)=>{
        console.log('database-connect')
    }).catch(err=>console.log('error',err));
   
    const userSchema = new mongoose.Schema({
        fullname:{
            type:String,
            require:true,
           
        },
        email:{
            type:String,
            required:true,
            unique:true
    
        },
        password:{
            type:String,
            requires:true,
        },

        

    },{timestamps:true})
    const Usermodel = mongoose.model('newUser',userSchema);
  
module.exports = { mongoose,Usermodel }


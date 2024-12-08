const express = require('express');

const app = express();
const myroute = express.Router();

myroute.post('/',(req,res)=>{
   
    //var frontendurl = __dirname;
   // frontendurl = frontendurl.slice(0,-22);
  //res.status(200).send('okkk'+ frontendurl+'/front-end/index.html');


   frontendpath = path.join(__dirname, '../../front-end/index.html');
   res.sendFile(frontendpath + 'front-end/index.html')
})


exports.myroute = myroute;
    const express = require('express');
    const app = express();
    var cors = require('cors')
    const env = require('dotenv');
    const { myroute } = require('./routes/myroute/myroute');
    const registrationRoute  = require('./routes/registration');
    const loginRoute = require('./routes/loginRoute');
    //const checkingRoute = require('./routes/checkInformation')
    const jwt = require('jsonwebtoken');    
    //craete socket server
    const { Server } = require('socket.io')
    const http = require('http');
    const { checkingRoute } = require('./routes/checkInformation');
    const server = http.createServer(app);

    const io = new Server(server,{
        cors: {
        origin: 'http://localhost:4000', // established socket.io connection
        
            credentials: true,
    }},
    );

    env.config();
    app.use(cors());
    const port =  process.env.PORT || 3000;
    app.use(express.static('front-end'))


    // app.use(cors({
    //     origin: 'http://localhost:4000/',  // Replace with your frontend origin
    //     credentials: true
    //   }));
        
        app.use(express.json());
        app.use(myroute);
        app.use(registrationRoute);
        app.use(loginRoute);
        app.use(checkingRoute)

            io.on('connection',(socket)=>{
                socket.on('chat message',(msg)=>{
                    console.log(msg);
                    socket.broadcast.emit('chat message', msg);
                })
            })

        // io.use((socket, next) => {
        //     const token = socket.handshake.auth.token;
            
        //     if (!token) {
        //         return next(new Error('Authentication token missing'));
        //     }
            
        //     try{ const decoded = jwt.verify(token, process.env.SECRETE_KEY);
        //         console.log(decoded)
        //         socket.user = decoded; // Attach decoded user info for further use
        //         next();
        //     }catch(e){
        //         return next(new Error('Invalid authentication token'));

        //     }

            
        // next();
        // });

//         io.on('connection',(socket)=>{
//             console.log('clint connected',socket.id) 
//             socket.on('message', (msg) => {
//                 console.log('message:'+ msg);
                
//             });
            
   
// })


// app.use((err, req, res, next) => {
//     console.error('Unexpected error:', err.stack);
//     res.status(500).json({ error: 'Something went wrong!' });
// });

server.listen(port,()=>{
    console.log(`server is running on ${port}`)
})
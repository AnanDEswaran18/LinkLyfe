const express = require('express'); // Import express

const connectDB = require('./config/dbConnection');

const dotenv = require('dotenv').config() // Import dotenv

connectDB(); // Connect to database

const app = express(); // Create express app

const errorHandler = require('./middleware/errorHandler') // Import error handler

const port = process.env.PORT || 5000; // Port to run server on
app.use(express.json()); // Parse JSON bodies (as sent by API clients)
app.use('/api/contacts',require('./routes/contactRoutes') ); //it is a middleware
app.use('/api/users',require('./routes/userRoutes') );
app.use(errorHandler) //it is a middleware

app.listen(port, () =>{
    console.log("server running on port "+port);
});

// const fetchData = ()=>{
//     const promise = new Promise((res,rej)=>{
//             const random = Math.random();
//             if(random<0.5){
//                 res(`Error!!! ${random}`)
//             }
//             else{
//                 rej(`Done!!! ${random}`)
//             }
//     })
//     return promise;
// }

// setTimeout(()=>{
//     fetchData().then(ret =>{
//         console.log(ret);
//     }).catch(rej=>{
//         setTimeout(()=>{
//             console.log(rej)
//         },3000)
//     })
// },2000)
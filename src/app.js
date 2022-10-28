const express = require('express') 

const app = express() 
const routes = require('./routes/index.route')


routes(app) 

const PORT = 5000 
app.listen(PORT, ()=>{
    console.log(' Application Listening On Port ' + PORT )
})
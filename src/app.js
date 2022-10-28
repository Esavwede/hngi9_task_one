const express = require('express') 
const cors = require('cors') 
const app = express() 
const routes = require('./routes/index.route')


app.use( cors())
routes(app) 

const PORT = process.env.PORT 
app.listen(PORT, ()=>{
    console.log(' Application Listening On Port ' + PORT )
})
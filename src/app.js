const express = require('express') 
const cors = require('cors') 
const app = express() 
const routes = require('./routes/index.route')




app.use( cors())
app.use( express.json() )
routes(app) 

process.on("SIGINT",()=>{
    process.exit(0)
})

const PORT = process.env.PORT || 3000 
app.listen(PORT, ()=>{
    console.log(' Application Listening On Port ' + PORT )
})
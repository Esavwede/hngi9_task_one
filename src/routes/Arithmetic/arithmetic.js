const express = require('express')

const router = express.Router() 

const { arithmeticController } = require('../../controller/arithmetic/arithmetic.controller')


module.exports = function(app)
{
    try 
    {


        router.post('/', arithmeticController )
        app.use('/api/v1/arithmetic', router)
    }
    catch(e)
    {
        console.log(" Error occured while creating arithmetic route ")
        console.log( e ) 
    }
}
const express = require('express') 
const router = express.Router() 
const { getRouteHandler  } = require('../../controller/getRoute/getRoute.controller')


module.exports = function getRoute(app)
{
    try 
    {
        router.get('/', getRouteHandler )

        app.use('/', router )
    }
    catch(e)
    {
        console.log(" Error occured while creating get Route ")
        console.log( e )
    }
}
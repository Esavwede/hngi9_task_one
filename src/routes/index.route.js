

const express = require('express')
const getRoute = require('./RouteForAssignedTask/getRoute')

module.exports = function routes(app)
        {
            try 
            {
                getRoute(app) 
            }
            catch(e)
            {
                console.log(' Error occured while creating server routes ')
                console.log( e ) 
            }
        }
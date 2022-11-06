

const express = require('express')
const getRoute = require('./RouteForAssignedTask/getRoute')
const arithmeticRoute = require('./Arithmetic/arithmetic')

module.exports = function routes(app)
        {
            try 
            {
                getRoute(app) 
                arithmeticRoute(app)
            }
            catch(e)
            {
                console.log(' Error occured while creating server routes ')
                console.log( e ) 
            }
        }


const getRouteHandler = function(req, res, next)
{
    try 
    {
        const slackUsername = 'Ogaga'
        const backend = true 
        const age = 24
        const bio = ' A curious developer who enjoys problem solving and writing reliable software '
        const jsonResponse = { slackUsername, backend, age, bio }

        res.status(200).json( jsonResponse ) 
    }
    catch(e)
    {
        console.log(' Server Encountered error ')
        console.log( e )
        return res.status(500).json({ "success": false, "msg":" Server Encountered error in get route "})
    }
}


module.exports = { getRouteHandler } 
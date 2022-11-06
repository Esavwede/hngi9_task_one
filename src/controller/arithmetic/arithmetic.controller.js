

const { arithmeticInputSchema } = require('../../validation/arithmeticInput.schema')
const { Configuration, OpenAIApi } = require("openai")


function cleanResult( result )
{
    try 
    {
        console.log( result )
        const parsedResult = parseInt( result, 0 )
        console.log(` Parsed Result : ${ parsedResult }`)
       return parsedResult
    }
    catch(e)
    {
        console.log(' Error occured while cleaning result ')
        console.log( e )
    }
}


async function evaluateArithmeticOperationInString(string)
{
    try 
    {

        console.log( process.env.OPEN_API_SECRET_KEY )

        const instruction = `
        I am a bot that takes a text input and determines the mathematical operation to be performed based on the text input; returning only the exact answer
        
        Text: what is the sum of 2 and 5
        Ans: 7

        Text: 3 + ten - 7
        Ans: 6 
        
        Text: five times 5
        Ans: 25

        Text: what will be the answer of 2 + 2
        Ans: 4

        Text: evaluate the following expression, 2 x 2 + 1 
        Ans: 4 

        Text: what will be the result of: 777 * 2 
        Ans: 1554

        Text: If I add one to 300, what will be the answer ? 
        Ans: 301

        Text: If I subtract ten from 300, what will be the answer ? 
        Ans: 290

        Text: Multiplying 7 by 2 gives ? 
        Ans: 14 

        Text:  multiplying 8 by 2 and adding 1 gives ? 
        Ans: 17

        
        
        Text: I want to add 2 and 9 
        Ans: 11 
        
        Text: Assuming I subtract 1000 from 100, what will I get
        Ans: -900


        Text: Let's say I add 4 to 5, what will the answer be 
        Ans: 9
        

        Text: Can you please multiply the following numbers together - 10 and 10
        Ans: 100

        Text: subtract two hundred thousand from seven hundred thousand 
        Ans: five hundred thousand 
            
        
        Text: Can you please add the following numbers together - 3 and 7 
        Ans: 10

        Text: 100 + 200 
        Ans: 300

        Text: Seventy seven multiplied by two
        Ans: 154

        Text: Seventy plus zero 
        Ans: 70

        Text: Seventy + 1000
        Ans: 1070


        Text: eight hundred plus two 
        Ans: 802 

        Text: adding one and two will give 
        Ans: 3 

        Text: When I multiply zero with seven what do I get
        Ans: 0

        Text: ${ string }
        Ans:`

        const configuration = new Configuration({
        apiKey: process.env.OPEN_API_SECRET_KEY ,
        });

        const openai = new OpenAIApi(configuration);

        const completion = await openai.createCompletion({
        model: "text-davinci-002",
        max_tokens: 5,
        prompt: instruction,
        },
        {
            timeout: 30000
        });

        const result = completion.data.choices[0].text
        return result 
    }
    catch(error)
    {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
          } else {
            console.log(error.message);
          }
        throw new Error( error )
    }
}


function addXY(x,y )
{
    try 
    {
        return x + y 
    }
    catch(e)
    {
        throw new Error('  Error occured while adding x and y  ')
    }
}


function subtractXY(x, y)
{
    try 
    {
        return x - y 
    }
    catch(e)
    {
        throw new Error('  Error occured while subtracting y from  x ')   
    }
}


function multiplyXY(x, y)
{
    try 
    {
        return x * y 
    }
    catch(e)
    {
        throw new Error('  Error occured while multiplying x and y  ')
    }
}


const arithmeticController = async function(req, res, next)
{
    try 
    {
        // Validate input 
        await arithmeticInputSchema.validateAsync( req.body )

        const { operation_type, x, y } = req.body 
        var result = null 

        switch( operation_type )
        {

            case "addition": 

                            result = addXY( x, y )
                            break; 

            case "subtraction":
                            result = subtractXY(x, y)
                            break;

            case  "multiplication":

                            result = multiplyXY(x, y)
                            break; 

            default:
                            // Try To Generate Result 
                            result = await evaluateArithmeticOperationInString(operation_type)
                            result = cleanResult( result )
                            break; 
        }


        return res.status(200).json({ "slackUsername": "ogaga369", result, operation_type })

    }
    catch(e)
    {
        if( e.isJoi )
        {
            return res.status(400).json({ success: false, msg: e.message })
        }

        console.log('Server encountered error while processing arithmetic ')
        console.log( e ) 
        res.status(500).json({ success: false, msg: e.message })
    }
}

module.exports = { arithmeticController}
const Joi = require('joi') 


const arithmeticInputSchema = Joi.object
    (
        {
            operation_type: Joi.string().required(),
            x: Joi.number(),
            y: Joi.number()
        }
    )


module.exports =  { arithmeticInputSchema }
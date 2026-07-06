import Joi from "joi";

const donateSchema = Joi.object({
    donate: Joi.object({
        quantity: Joi.string().required(),
        pickupTime: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).required(),
        foodType: Joi.string().required(),
        location: Joi.string().required(),
    })
})

export default donateSchema;
import Joi from "joi";





export const addEventSchema = Joi.object({
    body: {
        title: Joi.string().min(2).max(100).required(),
        description: Joi.string().min(2).max(1000).required(),
        startedAt: Joi.date().required(),
        endedAt: Joi.date().required(),
        location: Joi.string().min(2).max(500).required(),
        ticket_price: Joi.number().min(0).required(),
        available_Seats: Joi.number().integer().min(0).required(),
    },
    params: {},
    query: {}
})
export const getSpecificEventSchema = Joi.object({
    body: {},
    params: { event_id: Joi.string().hex().length(24).required(), },
    query: {}
})
export const updateEventSchema = Joi.object({
    body: {
        title: Joi.string().min(2).max(100).optional(),
        description: Joi.string().min(2).max(1000).optional(),
        startedAt: Joi.date().optional(),
        location: Joi.string().min(2).max(500).optional(),
        ticket_price: Joi.number().min(0).optional(),
        available_Seats: Joi.number().integer().min(0).optional(),
    },
    params: { event_id: Joi.string().hex().length(24).required(), },
    query: {}
})
export const deleteEventSchema = Joi.object({
    body: {},
    params: { event_id: Joi.string().hex().length(24).required(), },
    query: {}
})





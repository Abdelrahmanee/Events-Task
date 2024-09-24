import { Router } from "express";
import { addEvent, deleteEvent, getAllEvents, getSpecificEvent, updateEvent } from "./event.controllers.js";
import { validate } from "../../middelwares/validation.middelware.js";
import { addEventSchema, deleteEventSchema, getSpecificEventSchema, updateEventSchema } from "./event.validation.js";
import { authenticate, authorize } from "../../middelwares/global.middelware.js";
import { ROLES } from "../../utilies/enums.js";
import { checkEventExist, checkOrganizerExist, checkOrganizerIsEventCreator, checkTimeIsValid } from "./event.middelware.js";




const eventRouter = Router();

eventRouter.route('/')
    .get(authenticate, authorize(), getAllEvents)
    .post(
        validate(addEventSchema),
        checkTimeIsValid,
        authenticate,
        authorize([ROLES.ORGANIZER]),
        checkOrganizerExist,
        addEvent
    )



eventRouter.route('/:event_id')
    .get(
        validate(getSpecificEventSchema),
        authenticate,
        authorize([ROLES.ORGANIZER]),
        checkOrganizerExist,
        checkEventExist,
        checkOrganizerIsEventCreator,
        getSpecificEvent
    )
    .patch(
        validate(updateEventSchema),
        authenticate,
        authorize([ROLES.ORGANIZER]),
        checkTimeIsValid,
        checkOrganizerExist,
        checkEventExist,
        checkOrganizerIsEventCreator,
        updateEvent
    )
    .delete(
        validate(deleteEventSchema),
        authenticate,
        authorize([ROLES.ORGANIZER]),
        checkOrganizerExist,
        checkEventExist,
        checkOrganizerIsEventCreator,
        deleteEvent
    )



export default eventRouter
import { Event } from "../../../db/models/event.model.js"
import { User } from "../../../db/models/user.model.js"
import { AppError, catchAsyncError } from "../../utilies/catchAsyncError.js"


export const checkOrganizerExist = catchAsyncError(async (req, res, next) => {
    const { _id: organizer } = req.user
    const organizerIsExist = await User.findById(organizer)
    if (!organizerIsExist)
        throw new AppError('Organizer not exist', 404)

    req.organizer = organizerIsExist.toObject()
    next()
})
export const checkEventExist = catchAsyncError(async (req, res, next) => {
    const { event_id } = req.params
    const eventIsExist = await Event.findById(event_id)
    if (!eventIsExist)
        throw new AppError('Event not exist', 404)
    req.event = eventIsExist.toObject()
    next()
})

export const checkOrganizerIsEventCreator = catchAsyncError(async (req, res, next) => {
    const event = req.event
    const organizer = req.organizer
    const isCreator = await Event.findOne({ organizer: organizer._id, _id: event._id })

    if (!isCreator)
        throw new AppError('Not allowed', 403)
    req.targetEvent = isCreator
    next()

})

export const checkTimeIsValid = catchAsyncError(async (req, res, next) => {

    if (req.body.startedAt) {

        const { startedAt, endedAt } = req.body
        let now_date = new Date(Date.now())
        let event_start = new Date(startedAt)
        let event_end = new Date(endedAt)
        if (now_date > event_start || event_start > event_end || event_end < now_date)
            throw new AppError("Invalid date , (determine date in future and before eventnd)", 400)
        next()
    }
})
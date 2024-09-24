import { Event } from "../../../db/models/event.model.js";
import { User } from "../../../db/models/user.model.js";
import { ApiFeatures } from "../../utilies/api.features.js";
import { AppError, catchAsyncError } from "../../utilies/catchAsyncError.js";


export const addEvent = (async (req, res) => {
    const organizer = req.organizer
    const event = new Event({
        organizer: organizer._id,
        organizerName: organizer.userName,
        ...req.body
    })
    await event.save()
    res.status(201).json({ status: "success", message: "event is created", data: event })
})

export const getAllEvents = catchAsyncError(async (req, res) => {

    const api_features = new ApiFeatures(Event.find(), req.query).pagination().fields().sort().search().filter()

    const limit = api_features.limit
    const events = await api_features.mongooseQuery
    const totalEvents = await Event.countDocuments();
    const totalPages = Math.ceil(totalEvents / limit);
    res.status(200).json({
        status: "success", message: "All products", pagination: {
            totalEvents,
            totalPages,
            currentPage: api_features.pageNumber,
            limit,
        },
        result: events.length,
        data: events || [],
    })
})

export const getSpecificEvent = catchAsyncError(async (req, res) => {
    res.status(200).json({ status: "success", message: "event details", data: req.targetEvent })
})


export const deleteEvent = catchAsyncError(async (req, res) => {
    await req.targetEvent.deleteOne()
    res.status(200).json({ status: "success", message: "event is deleted" })
})

export const updateEvent = catchAsyncError(async (req, res) => {
    const updatedEvent = await Event.findByIdAndUpdate(req.targetEvent._id, req.body, { new: true })
    res.status(200).json({ status: "success", message: "event is updated", data: updatedEvent })
})
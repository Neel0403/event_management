import { Event } from "../models/event.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import moment from "moment"

const createEvent = asyncHandler(async (req, res) => {
    const { name, description, category, date, time, location, maxAttendees, ticketPrice } = req.body

    if (!name || !description || !category || !time || !location || !maxAttendees) {
        throw new ApiError(400, "All fields are required")
    }

    const formattedDate = moment(date, "DD/MM/YYYY").toDate()

    if (!formattedDate || isNaN(formattedDate.getTime())) {
        throw new ApiError(400, "Invalid date format. Please use DD/MM/YYYY")
    }

    const imageLocalPath = req.files?.images?.[0]?.path

    console.log("Image Local Path:", imageLocalPath)

    const image = await uploadOnCloudinary(imageLocalPath)

    const event = await Event.create({
        name,
        description,
        category,
        time,
        date: formattedDate,
        location,
        organizer: req.user._id,
        maxAttendees,
        ticketPrice,
        images: image?.url
    })

    if (!event) {
        throw new ApiError(400, "Event could not be created")
    }

    return res
        .status(201)
        .json(new ApiResponse(201, { ...event._doc, date: moment(event.date).format("DD/MM/YYYY") }, "Event created successfully"))
})

const getEvents = asyncHandler(async (req, res) => {
    const events = await Event.find()

    if (!events) {
        throw new ApiError(400, "No events found")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, events, "Events retrieved successfully"))
})

const getEventById = asyncHandler(async (req, res) => {
    const { eventId } = req.params

    if (!eventId) {
        throw new ApiError(400, "Event ID is required")
    }

    const event = await Event.findById(eventId)

    if (!event) {
        throw new ApiError(404, "Event not found")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, event, "Event retrieved successfully"))
})

const updateEvent = asyncHandler(async (req, res) => {
    const { name, description, time, location, maxAttendees } = req.body
    const { eventId } = req.params

    if (!eventId) {
        throw new ApiError(404, "Invalid Event Id")
    }

    const event = await Event.findById(eventId)

    if (!event) {
        throw new ApiError(404, "Event not found")
    }

    if (!req.user._id.equals(event.organizer)) {
        throw new ApiError(403, "You are not authorized to update this event")
    }

    const imageLocalPath = req.files?.images?.[0]?.path

    if (imageLocalPath) {
        const image = await uploadOnCloudinary(imageLocalPath)

        if (image) {
            event.images = image.url
        }
    }

    const updatedEvent = await Event.findOneAndUpdate({ _id: eventId }, {
        $set: {
            name,
            description,
            time,
            location,
            maxAttendees
        }
    }, { new: true })

    if (!updatedEvent) {
        throw new ApiError(400, "Event could not be updated")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, updatedEvent, "Event updated successfully"))
})

const deleteEvent = asyncHandler(async (req, res) => {
    const { eventId } = req.params

    if (!eventId) {
        throw new ApiError(404, "Invalid Event Id")
    }

    const event = await Event.findById(eventId)

    if (!event) {
        throw new ApiError(404, "Event not found")
    }

    if (!req.user._id.equals(event.organizer)) {
        throw new ApiError(403, "You are not authorized to delete this event")
    }

    const deletedEvent = await Event.findOneAndDelete(eventId)

    if (!deletedEvent) {
        throw new ApiError(400, "Event could not be deleted")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, deletedEvent, "Event deleted successfully"))
})

export {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent
}
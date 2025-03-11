import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ["CONFERENCE", "SEMINAR", "SOCIAL", "WORKSHOP", "OTHERS"],
    },
    time: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    maxAttendees: {
        type: Number,
        required: true,
    },
    images: [{
        type: String  // Cloudinary url
    }],
    ticketPrice: {
        type: Number,
        default: 0
    },
    virtualMeetingLink: String
}, { timestamps: true })

export const Event = mongoose.model("Event", eventSchema)
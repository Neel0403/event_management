import { Schema } from "mongoose"

const attendeeSchema = new Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ["REGISTERED", "CANCELLED", "ATTENDED"],
        default: "REGISTERED"
    },
    ticketNumber: String,
    checkInTime: Date,
    specialRequirements: String
})

export const Attendee = mongoose.model("Attendee", attendeeSchema);
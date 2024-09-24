import { model, Schema, Types } from "mongoose";
import { EVENTSTATUS, MODELS } from "../../src/utilies/enums.js";



const eventSchema = new Schema({
    title: {
        type: String,
        minLength: 2,
        maxLength: 100,
        required: true
    },
    description: {
        type: String,
        minLength: 2,
        maxLength: 1000,
        required: true
    },
    startedAt: {
        type: Date,
        required: true
    },
    endedAt: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        minLength: 2,
        maxLength: 500,
        required: true
    },
    organizer: {
        type: Types.ObjectId,
        ref: MODELS.USER,
        required: true
    },
    organizerName: {
        type: String,
        minLength: 2,
        maxLength: 100,
    },
    ticket_price: {
        type: Number,
        min: 0,
        required: true
    },
    available_Seats: {
        type: Number,
        min: 3,
        required: true
    },
    status: {
        type: String,
        enums: Object.values(EVENTSTATUS),
        default: EVENTSTATUS.WATING
    }
},
    {
        timeseries: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    },

)
// calculate duration of an event
eventSchema.virtual('timeDifference').get(function () {
    const timeDiff = this.endedAt - this.startedAt;
    const seconds = Math.floor((timeDiff / 1000) % 60);
    const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);


    // Check if timeLeftToStart has a value
    const timeLeft = this.timeLeftToStart;
    if (timeLeft && timeLeft !== 'Event has started or passed') {
        return `${weeks} weeks, ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds (Time left to start: ${timeLeft})`;
    }

    return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
});

// Virtual field to calculate the remaining time to start the event
eventSchema.virtual('timeLeftToStart').get(function () {
    const currentTime = new Date();
    const timeLeft = this.startedAt - currentTime;

    if (timeLeft <= 0) {
        return 'Event has started or passed';
    }

    const seconds = Math.floor((timeLeft / 1000) % 60);
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));

    return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
});

export const Event = model(MODELS.EVENT, eventSchema)
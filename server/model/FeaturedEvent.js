import mongoose from "mongoose";

const featuredEventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    images: [{
        type: String,
        default: '/placeholder-logo.png'
    }],
    highlights: {
        type: [String],
        default: []
    },
    stats: {
        speakers: {
            type: Number,
            default: 0
        },
        attendees: {
            type: Number,
            default: 0
        },
        workshops: {
            type: Number,
            default: 0
        },
        days: {
            type: Number,
            default: 1
        }
    },
    registrationLink: {
        type: String,
        default: '#'
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const FeaturedEvent = mongoose.model("FeaturedEvent", featuredEventSchema);
export default FeaturedEvent;

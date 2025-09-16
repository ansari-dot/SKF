import mongoose from "mongoose";


const mediaSchema = new mongoose.Schema({
    mediaType: {
        type: String, // news, blog, event
        required: true,
        enum: ['news', 'blog', 'event']
    },
    heading: {
        type: String,
        required: true,
    },
    team: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    highlight: {
        type: [String],
        required: true
    },
    link: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: '/placeholder-logo.png'
    },
    date: {
        type: Date,
        default: Date.now
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        default: []
    }
}, {
    timestamps: true
});
const Media = mongoose.model("Media", mediaSchema);
export default Media;
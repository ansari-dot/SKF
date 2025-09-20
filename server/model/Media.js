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
        default: []
    },
    link: {
        type: String,
        default: ''
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
        default: 'Admin'
    },
    category: {
        type: String,
        default: 'General'
    },
    tags: {
        type: [String],
        default: []
    },
    relatedMedia: [{
        _id: String,
        heading: String,
        description: String,
        image: String,
        date: Date,
        mediaType: String
    }]
}, {
    timestamps: true
});
const Media = mongoose.model("Media", mediaSchema);
export default Media;
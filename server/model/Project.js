import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, // Example: "Flood Relief Initiative"
    },
    description: {
        type: String,
        required: true, // Example: "Emergency response providing food, shelter..."
    },
    location: {
        type: String, // Example: "Sindh Province"
    },
    status: {
        type: String,
        enum: ["Planned", "Ongoing", "Completed"],
        default: "Planned" // Example: "Completed"
    },
    startDate: {
        type: Date, // Example: "2025-08-01"
    },
    endDate: {
        type: Date, // Example: "2025-08-31"
    },
    impact: {
        familiesAssisted: {
            type: Number, // Example: 10000
            default: 0
        },
        otherImpact: {
            type: String // Optional field for more impact details
        }
    },
    image: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Project = mongoose.model("Project", ProjectSchema);

export default Project;
import mongoose from "mongoose";

const OpportunitySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        enum: ["Volunteer", "Sponsorship", "Partnership", "Job", "Internship"],
        required: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    duration: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    requirements: [{
        type: String,
        required: true
    }],
    status: {
        type: String,
        enum: ["Active", "Closed", "Draft"],
        default: "Active"
    },
    applicationDeadline: {
        type: Date,
        required: false
    },
    contactEmail: {
        type: String,
        required: true,
        trim: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Opportunity = mongoose.model("Opportunity", OpportunitySchema);

export default Opportunity;
import mongoose from "mongoose";

const ProgramSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    keyFeatures: {
        type: [String],
        default: []
    },
    impact: {
        beneficiaries: {
            type: Number,
            default: 0
        },
        locations: {
            type: Number,
            default: 0
        },
        responseTime: {
            type: String,
            default: ""
        }
    },
    image: {
        type: String,
        required: true
    },
    sustainability: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Program = mongoose.model("Program", ProgramSchema);

export default Program;
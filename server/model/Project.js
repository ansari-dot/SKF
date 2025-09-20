import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    // Basic Information
    title: {
        type: String,
        required: true,
        trim: true
    },
    shortDescription: {
        type: String,
        required: true,
        trim: true
    },
    detailedDescription: {
        type: String,
        trim: true
    },
    
    // Project Details
    category: {
        type: String,
        enum: ["Relief", "Education", "Healthcare", "Infrastructure", "Other"],
        default: "Other"
    },
    location: {
        address: String,
        city: String,
        province: String,
        country: {
            type: String,
            default: "Pakistan"
        },
        coordinates: {
            lat: Number,
            lng: Number
        }
    },
    
    // Timeline
    status: {
        type: String,
        enum: ["Planning", "Fundraising", "In Progress", "Completed", "On Hold"],
        default: "Planning"
    },
    startDate: {
        type: Date
    },
    expectedEndDate: {
        type: Date
    },
    actualEndDate: {
        type: Date
    },
    
    // Financial Information
    budget: {
        type: Number,
        min: 0
    },
    fundsRaised: {
        type: Number,
        default: 0
    },
    
    // Impact Metrics
    impact: {
        familiesAssisted: {
            type: Number,
            default: 0
        },
        individualsBenefited: {
            type: Number,
            default: 0
        },
        volunteersInvolved: {
            type: Number,
            default: 0
        },
        keyAchievements: [{
            type: String
        }],
        successStories: [{
            title: String,
            description: String,
            image: String
        }]
    },
    
    // Media
    images: [{
        url: String,
        caption: String,
        isPrimary: {
            type: Boolean,
            default: false
        }
    }],
    documents: [{
        title: String,
        url: String,
        type: {
            type: String,
            enum: ["report", "proposal", "certificate", "other"]
        }
    }],
    
    // Team & Partners
    projectManager: {
        name: String,
        contact: String
    },
    partners: [{
        name: String,
        logo: String,
        website: String
    }],
    
    // Additional Information
    challengesFaced: [String],
    lessonsLearned: [String],
    futurePlans: String,
    
    // System Fields
    isFeatured: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Project = mongoose.model("Project", ProjectSchema);

export default Project;
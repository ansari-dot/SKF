import mongoose from "mongoose";

const sponsorshipSchema = new mongoose.Schema({
    organizationName: {
        type: String,
        required: true,
        trim: true
    },
    contactPerson: {
        type: String,
        required: false,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: false,
        trim: true
    },
    programsOfInterest: [{
        type: String,
        required: true,
    }],
    sponsorshipLevel: {
        type: String,
        required: false
    },
    duration: {
        type: String,
        required: false
    },
    additionalInfo: {
        type: String,
        required: false
    },
    read: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Sponsorship = mongoose.model("Sponsorship", sponsorshipSchema);

export default Sponsorship;
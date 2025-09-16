import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: false },
    areasOfInterest: [{ type: String, required: true }],
    availability: { type: String, required: true },
    timeCommitment: { type: String, required: false },
    whyJoin: { type: String, required: true },
    read: { type: Boolean, default: false }
}, { timestamps: true });

const Volunteer = mongoose.model("Volunteer", volunteerSchema);

export default Volunteer;
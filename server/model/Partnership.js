import mongoose from "mongoose";

const partnershipSchema = new mongoose.Schema({
    organizationName: { type: String, required: true },
    organizationType: { type: String, required: false },
    contactPerson: { type: String, required: true },
    position: { type: String, required: false },
    email: { type: String, required: true },
    phone: { type: String, required: false },
    partnershipTypes: [{ type: String, required: true }],
    description: { type: String, required: true },
    read: { type: Boolean, default: false }
}, { timestamps: true });

const Partnership = mongoose.model("Partnership", partnershipSchema);

export default Partnership;
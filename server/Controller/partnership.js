import Partnership from "../model/Partnership.js";
import User from "../model/User.js";

class PartnershipController {

    //  Helper: check if user exists and is admin
    static async checkAdmin(userId) {
        const user = await User.findById(userId);
        if (!user) return { exists: false, isAdmin: false };
        return { exists: true, isAdmin: user.role === "admin" };
    }

    //  Create Partnership (Any logged-in user can do this)
    static async createPartnership(req, res) {
        try {
            const { organizationName, organizationType, contactPerson, position, email, phone, partnershipTypes, description } = req.body;

            const newPartnership = new Partnership({
                organizationName,
                organizationType,
                contactPerson,
                position,
                email,
                phone,
                partnershipTypes,
                description
            });

            await newPartnership.save();

            res.status(201).json({ success: true, message: "Partnership created successfully", data: newPartnership });
        } catch (err) {
            res.status(500).json({ success: false, message: "Server error", error: err.message });
        }
    }

    //  Get All Partnerships (Admin only)
    static async getAllPartnerships(req, res) {
        try {
            const { exists, isAdmin } = await PartnershipController.checkAdmin(req.user._id);

            if (!exists) {
                return res.status(401).json({ message: "User does not exist" });
            }
            if (!isAdmin) {
                return res.status(403).json({ message: "Only admin can view all partnerships" });
            }

            const { search, status, sort = '-createdAt' } = req.query;
            let query = {};

            // Search functionality
            if (search) {
                const searchRegex = new RegExp(search, 'i');
                query.$or = [
                    { organizationName: searchRegex },
                    { contactPerson: searchRegex },
                    { email: searchRegex },
                    { description: searchRegex }
                ];
            }

            // Filter by read/unread status
            if (status && status !== 'all') {
                query.read = status === 'read';
            }

            const partnerships = await Partnership.find(query).sort({ createdAt: -1 });
            res.json({ success: true, data: partnerships });
        } catch (err) {
            res.status(500).json({ success: false, message: "Server error", error: err.message });
        }
    }

    //  Update Partnership Read Status (Admin only)
    static async setReadStatus(req, res) {
        try {
            const { exists, isAdmin } = await PartnershipController.checkAdmin(req.user._id);

            if (!exists) {
                return res.status(401).json({ message: "User does not exist" });
            }
            if (!isAdmin) {
                return res.status(403).json({ message: "Only admin can update partnership status" });
            }

            const { read } = req.body;
            const updated = await Partnership.findByIdAndUpdate(
                req.params.id,
                { read: Boolean(read) },
                { new: true }
            );

            if (!updated) {
                return res.status(404).json({ message: "Partnership not found" });
            }

            res.json({ success: true, message: "Partnership status updated", data: updated });
        } catch (err) {
            res.status(500).json({ success: false, message: "Server error", error: err.message });
        }
    }

    // Delete Partnership (Admin only)
    static async deletePartnership(req, res) {
        try {
            const { exists, isAdmin } = await PartnershipController.checkAdmin(req.user._id);

            if (!exists) {
                return res.status(401).json({ message: "User does not exist" });
            }
            if (!isAdmin) {
                return res.status(403).json({ message: "Only admin can delete a partnership" });
            }

            const deleted = await Partnership.findByIdAndDelete(req.params.id);

            if (!deleted) {
                return res.status(404).json({ message: "Partnership not found" });
            }

            res.json({ success: true, message: "Partnership deleted successfully" });
        } catch (err) {
            res.status(500).json({ success: false, message: "Server error", error: err.message });
        }
    }
}

export default PartnershipController;
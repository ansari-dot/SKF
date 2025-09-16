import Sponsorship from "../model/Sponsorship.js";
import User from "../model/User.js";

class SponsorshipController {

    // Helper: check if user exists and is admin
    static async checkAdmin(userId) {
        const user = await User.findById(userId);
        if (!user) return { exists: false, isAdmin: false };
        return { exists: true, isAdmin: user.role === "admin" };
    }

    //  Create Sponsorship (any logged-in user)
    static async createSponsorship(req, res) {
            try {
                const { organizationName, contactPerson, email, phone, programsOfInterest, sponsorshipLevel, duration, additionalInfo } = req.body;

                const newSponsorship = new Sponsorship({
                    organizationName,
                    contactPerson,
                    email,
                    phone,
                    programsOfInterest,
                    sponsorshipLevel,
                    duration,
                    additionalInfo
                });

                await newSponsorship.save();

                res.status(201).json({ success: true, message: "Sponsorship created successfully", data: newSponsorship });
            } catch (err) {
                res.status(500).json({ success: false, message: "Server error", error: err.message });
            }
        }
        //  Get All Sponsorships (Admin only)
    static async getAllSponsorships(req, res) {
        try {
            const { exists, isAdmin } = await SponsorshipController.checkAdmin(req.user._id);

            if (!exists) {
                return res.status(401).json({ message: "User does not exist" });
            }
            if (!isAdmin) {
                return res.status(403).json({ message: "Only admin can view all sponsorships" });
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

            const sponsorships = await Sponsorship.find(query).sort({ createdAt: -1 });
            res.json({ success: true, data: sponsorships });
        } catch (err) {
            res.status(500).json({ success: false, message: "Server error", error: err.message });
        }
    }

    //  Update Sponsorship Read Status (Admin only)
    static async setReadStatus(req, res) {
        try {
            const { exists, isAdmin } = await SponsorshipController.checkAdmin(req.user._id);

            if (!exists) {
                return res.status(401).json({ message: "User does not exist" });
            }
            if (!isAdmin) {
                return res.status(403).json({ message: "Only admin can update sponsorship status" });
            }

            const { read } = req.body;
            const updated = await Sponsorship.findByIdAndUpdate(
                req.params.id,
                { read: Boolean(read) },
                { new: true }
            );

            if (!updated) {
                return res.status(404).json({ message: "Sponsorship not found" });
            }

            res.json({ success: true, message: "Sponsorship status updated", data: updated });
        } catch (err) {
            res.status(500).json({ success: false, message: "Server error", error: err.message });
        }
    }

    // Delete Sponsorship (Admin only)
    static async deleteSponsorship(req, res) {
        try {
            const { exists, isAdmin } = await SponsorshipController.checkAdmin(req.user._id);

            if (!exists) {
                return res.status(401).json({ message: "User does not exist" });
            }
            if (!isAdmin) {
                return res.status(403).json({ message: "Only admin can delete a sponsorship" });
            }

            const deleted = await Sponsorship.findByIdAndDelete(req.params.id);

            if (!deleted) {
                return res.status(404).json({ message: "Sponsorship not found" });
            }

            res.json({ success: true, message: "Sponsorship deleted successfully" });
        } catch (err) {
            res.status(500).json({ success: false, message: "Server error", error: err.message });
        }
    }
}

export default SponsorshipController;
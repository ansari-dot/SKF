import Contact from "../model/Contact.js";
import User from "../model/User.js";

class ContactController {

    // Create Contact
    static async createContact(req, res) {
        try {
            const { firstName, lastName, email, phone, subject, message } = req.body;

            // Validate required fields
            if (!firstName || !lastName || !email || !subject || !message) {
                return res.status(400).json({
                    message: "Please fill all required fields",
                    success: false
                });
            }

            const newContact = new Contact({
                firstName,
                lastName,
                email,
                phone,
                subject,
                message
            });

            await newContact.save();

            res.status(201).json({
                message: "Contact form submitted successfully",
                success: true,
                data: newContact
            });
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err.message });
        }
    }

    // Get All Contacts with search, sort, and read/unread status (Admin only)
    static async getContacts(req, res) {
        try {
            const { exists, isAdmin } = await ContactController.checkAdmin(req.user._id);

            if (!exists) {
                return res.status(401).json({ message: "User does not exist" });
            }
            if (!isAdmin) {
                return res.status(403).json({ message: "Only admin can view all contacts" });
            }

            // Search and filter
            const { search, status } = req.query;
            let query = {};
            if (search) {
                query.$or = [
                    { firstName: { $regex: search, $options: "i" } },
                    { lastName: { $regex: search, $options: "i" } },
                    { email: { $regex: search, $options: "i" } },
                    { subject: { $regex: search, $options: "i" } },
                    { message: { $regex: search, $options: "i" } }
                ];
            }
            if (status === "read") query.read = true;
            if (status === "unread") query.read = false;

            // Sort by recent first
            const contacts = await Contact.find(query).sort({ createdAt: -1 });
            res.json({ success: true, data: contacts });
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err.message });
        }
    }

    // Mark Contact as Read/Unread (Admin only)
    static async setReadStatus(req, res) {
        try {
            const { exists, isAdmin } = await ContactController.checkAdmin(req.user._id);
            if (!exists) {
                return res.status(401).json({ message: "User does not exist" });
            }
            if (!isAdmin) {
                return res.status(403).json({ message: "Only admin can update contact status" });
            }
            const { id } = req.params;
            const { read } = req.body;
            const contact = await Contact.findByIdAndUpdate(id, { read }, { new: true });
            if (!contact) {
                return res.status(404).json({ message: "Contact not found" });
            }
            res.json({ success: true, data: contact });
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err.message });
        }
    }

    // Helper: check if user exists and is admin
    static async checkAdmin(userId) {
        const user = await User.findById(userId);
        if (!user) return { exists: false, isAdmin: false };
        return { exists: true, isAdmin: user.role === "admin" };
    }

    // Delete Contact (Admin only)
    static async deleteContact(req, res) {
        try {
            const { exists, isAdmin } = await ContactController.checkAdmin(req.user._id);

            if (!exists) {
                return res.status(401).json({ message: "User does not exist" });
            }
            if (!isAdmin) {
                return res.status(403).json({ message: "Only admin can delete contacts" });
            }

            const deleted = await Contact.findByIdAndDelete(req.params.id);

            if (!deleted) {
                return res.status(404).json({ message: "Contact not found" });
            }

            res.json({ message: "Contact deleted successfully", success: true });
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err.message });
        }
    }
}

export default ContactController;
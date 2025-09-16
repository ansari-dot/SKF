import Media from "../model/Media.js";
import User from "../model/User.js"; // ✅ Import User model

class MediaController {

    //  Helper function: check if user exists and is admin
    static async checkAdmin(userId) {
        const user = await User.findById(userId);
        if (!user) return { exists: false, isAdmin: false };
        return { exists: true, isAdmin: user.role === "admin" };
    }

    //  Create Media (Admin only)
    static async createMedia(req, res) {
        try {
            const { exists, isAdmin } = await MediaController.checkAdmin(req.user._id);

            if (!exists) {
                return res.status(401).json({ message: "User does not exist" });
            }
            if (!isAdmin) {
                return res.status(403).json({ message: "Only admin can add media" });
            }

            const { mediaType, heading, team, description, highlight, link, image, author, category, tags } = req.body;

            const newMedia = new Media({
                mediaType,
                heading,
                team,
                description,
                highlight,
                link,
                image: image || '/placeholder-logo.png',
                author,
                category,
                tags: tags || []
            });

            await newMedia.save();

            res.status(201).json({ success: true, message: "Media created successfully", data: newMedia });
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err.message });
        }
    }

    // Get All Media (Public + Admin)
    static async getAllMedia(req, res) {
        try {
            const media = await Media.find();
            res.json({ success: true, data: media });
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err.message });
        }
    }

    //  Get Single Media by ID
    static async getMediaById(req, res) {
        try {
            const media = await Media.findById(req.params.id);
            if (!media) {
                return res.status(404).json({ message: "Media not found" });
            }
            res.json({ success: true, data: media });
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err.message });
        }
    }

    // Update Media (Admin only)
    static async updateMedia(req, res) {
        try {
            const { exists, isAdmin } = await MediaController.checkAdmin(req.user._id);

            if (!exists) {
                return res.status(401).json({ message: "User does not exist" });
            }
            if (!isAdmin) {
                return res.status(403).json({ message: "Only admin can update media" });
            }

            const updatedMedia = await Media.findByIdAndUpdate(
                req.params.id,
                req.body, { new: true }
            );

            if (!updatedMedia) {
                return res.status(404).json({ message: "Media not found" });
            }

            res.json({ success: true, message: "Media updated successfully", data: updatedMedia });
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err.message });
        }
    }

    // Delete Media (Admin only)
    static async deleteMedia(req, res) {
        try {
            const { exists, isAdmin } = await MediaController.checkAdmin(req.user._id);

            if (!exists) {
                return res.status(401).json({ message: "User does not exist" });
            }
            if (!isAdmin) {
                return res.status(403).json({ message: "Only admin can delete media" });
            }

            const deletedMedia = await Media.findByIdAndDelete(req.params.id);

            if (!deletedMedia) {
                return res.status(404).json({ message: "Media not found" });
            }

            res.json({ success: true, message: "Media deleted successfully" });
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err.message });
        }
    }
}

export default MediaController;
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

            const { 
                mediaType = 'news', 
                heading = '', 
                team = '', 
                description = '', 
                highlight = [], 
                link = '', 
                image = '/placeholder-logo.png', 
                author = 'Admin', 
                category = 'General', 
                tags = [],
                relatedMedia = []
            } = req.body;

            const newMedia = new Media({
                mediaType,
                heading,
                team,
                description,
                highlight: Array.isArray(highlight) ? highlight : [highlight].filter(Boolean),
                link,
                image,
                author,
                category,
                tags: Array.isArray(tags) ? tags : [tags].filter(Boolean),
                relatedMedia: Array.isArray(relatedMedia) ? relatedMedia : []
            });

            await newMedia.save();

            res.status(201).json({ 
                success: true, 
                message: "Media created successfully", 
                data: newMedia 
            });
        } catch (err) {
            console.error('Error creating media:', err);
            res.status(500).json({ 
                success: false,
                message: "Server error", 
                error: err.message 
            });
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

            const { id } = req.params;
            const updateData = { ...req.body };

            // Convert single values to arrays if needed
            if (updateData.highlight && !Array.isArray(updateData.highlight)) {
                updateData.highlight = [updateData.highlight].filter(Boolean);
            }
            if (updateData.tags && !Array.isArray(updateData.tags)) {
                updateData.tags = [updateData.tags].filter(Boolean);
            }
            if (updateData.relatedMedia && !Array.isArray(updateData.relatedMedia)) {
                updateData.relatedMedia = [updateData.relatedMedia].filter(Boolean);
            }

            // Remove _id from update data to prevent changing the document ID
            delete updateData._id;
            delete updateData.__v;

            const updatedMedia = await Media.findByIdAndUpdate(
                id, 
                { $set: updateData },
                { new: true, runValidators: true }
            );

            if (!updatedMedia) {
                return res.status(404).json({ 
                    success: false,
                    message: "Media not found" 
                });
            }

            res.json({ 
                success: true, 
                message: "Media updated successfully", 
                data: updatedMedia 
            });
        } catch (err) {
            console.error('Error updating media:', err);
            res.status(500).json({ 
                success: false,
                message: "Server error", 
                error: err.message 
            });
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
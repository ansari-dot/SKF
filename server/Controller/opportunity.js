import Opportunity from "../model/Opportunity.js";


class OpportunityController {
    // Get all opportunities (Admin & User)
    static async getOpportunities(req, res) {
        try {
            const opportunities = await Opportunity.find({ status: { $ne: "Draft" } })
                .sort({ createdAt: -1 });
            return res.status(200).json({ success: true, opportunities });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error fetching opportunities",
                error: error.message
            });
        }
    }

    // Get all opportunities for admin (including drafts)
    static async getAllOpportunities(req, res) {
        try {
            const opportunities = await Opportunity.find()
                .sort({ createdAt: -1 });
            return res.status(200).json({ success: true, opportunities });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error fetching opportunities",
                error: error.message
            });
        }
    }

    // Get single opportunity by ID
    static async getOpportunityById(req, res) {
        try {
            const { id } = req.params;
            const opportunity = await Opportunity.findById(id);
            
            if (!opportunity) {
                return res.status(404).json({
                    success: false,
                    message: "Opportunity not found"
                });
            }

            return res.status(200).json({ success: true, opportunity });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error fetching opportunity",
                error: error.message
            });
        }
    }

    // Add new opportunity (Admin only)
    static async addOpportunity(req, res) {
        try {
            const {
                title,
                type,
                location,
                duration,
                description,
                requirements,
                applicationDeadline,
                contactEmail,
                status
            } = req.body;



            const opportunity = new Opportunity({
                title,
                type,
                location,
                duration,
                description,
                requirements: Array.isArray(requirements) ? requirements : [requirements],
                applicationDeadline: applicationDeadline || null,
                contactEmail,

                status: status || "Active"
            });

            await opportunity.save();

            return res.status(201).json({
                success: true,
                message: "Opportunity added successfully",
                opportunity
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error adding opportunity",
                error: error.message
            });
        }
    }

    // Update opportunity (Admin only)
    static async updateOpportunity(req, res) {
        try {
            const { id } = req.params;
            const {
                title,
                type,
                location,
                duration,
                description,
                requirements,
                applicationDeadline,
                contactEmail,
                status
            } = req.body;

            const opportunity = await Opportunity.findById(id);
            if (!opportunity) {
                return res.status(404).json({
                    success: false,
                    message: "Opportunity not found"
                });
            }



            opportunity.title = title;
            opportunity.type = type;
            opportunity.location = location;
            opportunity.duration = duration;
            opportunity.description = description;
            opportunity.requirements = Array.isArray(requirements) ? requirements : [requirements];
            opportunity.applicationDeadline = applicationDeadline || null;
            opportunity.contactEmail = contactEmail;

            opportunity.status = status || "Active";
            opportunity.updatedAt = Date.now();

            await opportunity.save();

            return res.status(200).json({
                success: true,
                message: "Opportunity updated successfully",
                opportunity
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error updating opportunity",
                error: error.message
            });
        }
    }

    // Delete opportunity (Admin only)
    static async deleteOpportunity(req, res) {
        try {
            const { id } = req.params;
            const opportunity = await Opportunity.findById(id);

            if (!opportunity) {
                return res.status(404).json({
                    success: false,
                    message: "Opportunity not found"
                });
            }



            await Opportunity.findByIdAndDelete(id);

            return res.status(200).json({
                success: true,
                message: "Opportunity deleted successfully"
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error deleting opportunity",
                error: error.message
            });
        }
    }
}

export default OpportunityController;
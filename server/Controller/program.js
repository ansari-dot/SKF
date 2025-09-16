import Program from "../model/Program.js";
import User from "../model/User.js";
import fs from 'fs';
import path from 'path';

class ProgramController {
    //  Get all programs (Admin & User)
    static async getPrograms(req, res) {
        try {
            const programs = await Program.find();
            return res.status(200).json({ success: true, programs });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error fetching programs",
                error: error.message
            });
        }
    }

    //  Add a new program (Admin only)
    static async addProgram(req, res) {
        try {
            const userId = req.user.id; // from auth middleware
            const user = await User.findById(userId);

            if (!user || user.role !== "admin") {
                return res.status(403).json({
                    success: false,
                    message: "Only admin can add programs"
                });
            } 

            let { name, description, keyFeatures, impact, sustainability } = req.body;

            //  Convert to array if sent as string
            if (typeof keyFeatures === "string") {
                keyFeatures = keyFeatures.split(",").map(item => item.trim());
            }
            if (typeof sustainability === "string") {
                sustainability = sustainability.split(",").map(item => item.trim());
            }

            // Handle image upload
            let imagePath = '/placeholder-logo.png';
            if (req.file) {
                imagePath = `/uploads/${req.file.filename}`;
            }

            // Parse impact if it's a string
            if (typeof impact === 'string') {
                impact = JSON.parse(impact);
            }

            const newProgram = new Program({
                name,
                description,
                keyFeatures,
                impact, // { beneficiaries, locations, responseTime }
                image: imagePath,
                sustainability
            });

            await newProgram.save();

            return res.status(201).json({ success: true, program: newProgram });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error adding program",
                error: error.message
            });
        }
    }

    // Update program (Admin only)
    static async updateProgram(req, res) {
        try {
            const userId = req.user.id;
            const user = await User.findById(userId);

            if (!user || user.role !== "admin") {
                return res.status(403).json({
                    success: false,
                    message: "Only admin can update programs"
                });
            }

            let { name, description, keyFeatures, impact, sustainability } = req.body;

            // Handle image upload
            let imagePath = req.body.image || '/placeholder-logo.png';
            if (req.file) {
                imagePath = `/uploads/${req.file.filename}`;
                
                // Delete old image if it exists and is not the default
                const oldProgram = await Program.findById(req.params.id);
                if (oldProgram && oldProgram.image && oldProgram.image !== '/placeholder-logo.png' && oldProgram.image.startsWith('/uploads/')) {
                    const oldImagePath = path.join(process.cwd(), 'uploads', path.basename(oldProgram.image));
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                    }
                }
            }

            // Parse impact if it's a string
            if (typeof impact === 'string') {
                impact = JSON.parse(impact);
            }

            const updateData = {
                name,
                description,
                keyFeatures,
                impact,
                image: imagePath,
                sustainability
            };

            const updatedProgram = await Program.findByIdAndUpdate(
                req.params.id,
                updateData,
                { new: true }
            );

            if (!updatedProgram) {
                return res.status(404).json({
                    success: false,
                    message: "Program not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Program updated successfully",
                program: updatedProgram
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error updating program",
                error: error.message
            });
        }
    }

    //  Delete program (Admin only)
    static async deleteProgram(req, res) {
        try {
            const userId = req.user.id;
            const user = await User.findById(userId);

            if (!user || user.role !== "admin") {
                return res.status(403).json({
                    success: false,
                    message: "Only admin can delete programs"
                });
            }

            // Get program before deleting to remove associated image
            const programToDelete = await Program.findById(req.params.id);
            if (!programToDelete) {
                return res.status(404).json({
                    success: false,
                    message: "Program not found"
                });
            }

            // Delete associated image file if it exists and is not the default
            if (programToDelete.image && programToDelete.image !== '/placeholder-logo.png' && programToDelete.image.startsWith('/uploads/')) {
                const imagePath = path.join(process.cwd(), 'uploads', path.basename(programToDelete.image));
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }

            await Program.findByIdAndDelete(req.params.id);

            return res.status(200).json({
                success: true,
                message: "Program deleted successfully"
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error deleting program",
                error: error.message
            });
        }
    }
}

export default ProgramController;
import Project from "../model/Project.js";
import User from "../model/User.js";
import fs from 'fs';
import path from 'path';

class ProjectController {
    // Get all projects (Admin & User)
    static async getProjects(req, res) {
        try {
            const projects = await Project.find();
            return res.status(200).json({ success: true, projects });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error fetching projects",
                error: error.message
            });
        }
    }

    //  Add a new project (Admin only)
    static async addProject(req, res) {
        try {
            const userId = req.user.id; // from auth middleware
            const user = await User.findById(userId);

            if (!user || user.role !== "admin") {
                return res.status(403).json({
                    success: false,
                    message: "Only admin can add projects"
                });
            }

            let { title, description, location, status, startDate, endDate, impact } = req.body;

            // Handle image upload
            let imagePath = '/placeholder-logo.png';
            if (req.file) {
                imagePath = `/uploads/${req.file.filename}`;
            }

            // Parse impact if it's a string
            if (typeof impact === 'string') {
                impact = JSON.parse(impact);
            }

            const newProject = new Project({
                title,
                description,
                location,
                status,
                startDate,
                endDate,
                impact, // { familiesAssisted, otherImpact }
                image: imagePath
            });

            await newProject.save();

            return res.status(201).json({ success: true, project: newProject });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error adding project",
                error: error.message
            });
        }
    }

    // Update project (Admin only)
    static async updateProject(req, res) {
        try {
            const userId = req.user.id;
            const user = await User.findById(userId);

            if (!user || user.role !== "admin") {
                return res.status(403).json({
                    success: false,
                    message: "Only admin can update projects"
                });
            }

            let { title, description, location, status, startDate, endDate, impact } = req.body;

            // Handle image upload
            let imagePath = req.body.image || '/placeholder-logo.png';
            if (req.file) {
                imagePath = `/uploads/${req.file.filename}`;
                
                // Delete old image if it exists and is not the default
                const oldProject = await Project.findById(req.params.id);
                if (oldProject && oldProject.image && oldProject.image !== '/placeholder-logo.png' && oldProject.image.startsWith('/uploads/')) {
                    const oldImagePath = path.join(process.cwd(), 'uploads', path.basename(oldProject.image));
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
                title,
                description,
                location,
                status,
                startDate,
                endDate,
                impact,
                image: imagePath
            };

            const updatedProject = await Project.findByIdAndUpdate(
                req.params.id,
                updateData,
                { new: true }
            );

            if (!updatedProject) {
                return res.status(404).json({
                    success: false,
                    message: "Project not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Project updated successfully",
                project: updatedProject
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error updating project",
                error: error.message
            });
        }
    }

    //  Delete project (Admin only)
    static async deleteProject(req, res) {
        try {
            const userId = req.user.id;
            const user = await User.findById(userId);

            if (!user || user.role !== "admin") {
                return res.status(403).json({
                    success: false,
                    message: "Only admin can delete projects"
                });
            }

            // Get project before deleting to remove associated image
            const projectToDelete = await Project.findById(req.params.id);
            if (!projectToDelete) {
                return res.status(404).json({
                    success: false,
                    message: "Project not found"
                });
            }

            // Delete associated image file if it exists and is not the default
            if (projectToDelete.image && projectToDelete.image !== '/placeholder-logo.png' && projectToDelete.image.startsWith('/uploads/')) {
                const imagePath = path.join(process.cwd(), 'uploads', path.basename(projectToDelete.image));
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }

            await Project.findByIdAndDelete(req.params.id);

            return res.status(200).json({
                success: true,
                message: "Project deleted successfully"
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error deleting project",
                error: error.message
            });
        }
    }
}

export default ProjectController;
import Project from "../model/Project.js";
import User from "../model/User.js";
import fs from "fs";
import path from "path";

class ProjectController {
  // Get single project by ID (Public)
  static async getProjectById(req, res) {
    try {
      const project = await Project.findById(req.params.id);

      if (!project) {
        return res.status(404).json({
          success: false,
          message: "Project not found",
        });
      }

      return res.status(200).json({
        success: true,
        project,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error fetching project",
        error: error.message,
      });
    }
  }

  // Get all projects (Admin & User)
  static async getProjects(req, res) {
    try {
      const projects = await Project.find();
      return res.status(200).json({ success: true, projects });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error fetching projects",
        error: error.message,
      });
    }
  }

  // Helper function to process uploaded files (static)
  static processUploadedFiles(files) {
    const result = { images: [] };
    if (!files) return result;

    // Process images
    if (files.images) {
      const imageFiles = Array.isArray(files.images)
        ? files.images
        : [files.images];
      result.images = imageFiles.map((file) => ({
        filename: file.filename,
        originalname: file.originalname,
        path: file.path,
        size: file.size,
        mimetype: file.mimetype,
        url: `/uploads/images/${file.filename}`,
      }));
    }

    return result;
  }

  // Add a new project (Admin only)
  static async addProject(req, res) {
    console.log('Request body:', req.body);
    console.log('Files received:', req.files);
    
    try {
      const userId = req.user?.id; // from auth middleware
      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Authentication required",
        });
      }

      const user = await User.findById(userId);
      if (!user || user.role !== "admin") {
        return res.status(403).json({
          success: false,
          message: "Only admin can add projects",
        });
      }

      // Parse project data from form data
      let projectData = {};
      if (req.body.projectData) {
        try {
          projectData = typeof req.body.projectData === 'string' 
            ? JSON.parse(req.body.projectData) 
            : req.body.projectData;
          console.log('Parsed project data:', projectData);
        } catch (e) {
          console.error('Error parsing project data:', e);
          return res.status(400).json({
            success: false,
            message: "Invalid project data format: " + e.message,
          });
        }
      } else {
        projectData = req.body;
      }

      // Process uploaded files using the static method
      const uploadedFiles = ProjectController.processUploadedFiles(req.files);

      // Map status to match the Project model's enum values
      const statusMap = {
        'Planned': 'Planning',
        'InProgress': 'In Progress',
        // Add other mappings if needed
      };
      
      // Transform the incoming data to match the Project model
      const projectPayload = {
        title: projectData.title,
        shortDescription: projectData.shortDescription,
        detailedDescription: projectData.detailedDescription,
        category: projectData.category,
        location: {
          address: projectData.location || 'Not specified',
          country: 'Pakistan' // Default country
        },
        status: statusMap[projectData.status] || projectData.status || 'Planning',
        startDate: projectData.startDate ? new Date(projectData.startDate) : null,
        expectedEndDate: projectData.endDate ? new Date(projectData.endDate) : null,
        impact: {
          familiesAssisted: projectData.impact?.familiesAssisted || 0,
          individualsBenefited: projectData.impact?.childrenBenefited || 0,
          keyAchievements: projectData.keyFeatures || []
        },
        images: uploadedFiles.images.map(img => ({
          url: img.url,
          caption: '',
          isPrimary: false
        })),
        isFeatured: projectData.isFeatured || false,
        createdBy: userId,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      
      // Create new project with transformed data
      const newProject = new Project(projectPayload);

      // Validate the project before saving
      const validationError = newProject.validateSync();
      if (validationError) {
        console.error('Validation error details:', validationError.errors);
        throw new Error(`Validation failed: ${validationError.message}`);
      }

      // Save the project
      const savedProject = await newProject.save();
      
      return res.status(201).json({
        success: true,
        message: "Project created successfully",
        project: savedProject,
      });
    } catch (error) {
      console.error('Error in addProject:', error);
      
      // Log detailed error information
      if (error.name === 'ValidationError') {
        console.error('Validation errors:', Object.values(error.errors).map(e => e.message));
      }
      if (error.code) {
        console.error('Error code:', error.code);
      }
      if (error.keyPattern) {
        console.error('Key pattern:', error.keyPattern);
      }
      if (error.keyValue) {
        console.error('Key value:', error.keyValue);
      }

      // Clean up uploaded files if there was an error
      if (req.files) {
        console.log('Cleaning up uploaded files due to error');
        Object.values(req.files)
          .flat()
          .forEach((file) => {
            try {
              if (file && file.path && fs.existsSync(file.path)) {
                console.log('Deleting file:', file.path);
                fs.unlinkSync(file.path);
              }
            } catch (cleanupError) {
              console.error("Error cleaning up file:", cleanupError);
            }
          });
      }

      // Return detailed error information
      const errorResponse = {
        success: false,
        message: "Error creating project",
        error: error.message,
      };

      if (error.name === 'ValidationError') {
        errorResponse.errors = {};
        Object.keys(error.errors).forEach(key => {
          errorResponse.errors[key] = error.errors[key].message;
        });
      }

      if (process.env.NODE_ENV === 'development') {
        errorResponse.stack = error.stack;
      }

      return res.status(500).json(errorResponse);
    }
  }

  // Get projects by category
  static async getProjectsByCategory(req, res) {
    try {
      const { category } = req.params;
      const projects = await Project.find({ category: { $regex: category, $options: 'i' } });
      return res.status(200).json({ success: true, projects });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error fetching projects by category',
        error: error.message
      });
    }
  }

  // Get featured projects
  static async getFeaturedProjects(req, res) {
    try {
      const projects = await Project.find({ isFeatured: true });
      return res.status(200).json({ success: true, projects });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error fetching featured projects',
        error: error.message
      });
    }
  }

  // Update project
  static async updateProject(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const project = await Project.findByIdAndUpdate(
        id,
        { ...updates, updatedAt: new Date() },
        { new: true, runValidators: true }
      );

      if (!project) {
        return res.status(404).json({
          success: false,
          message: 'Project not found'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Project updated successfully',
        project
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error updating project',
        error: error.message
      });
    }
  }

  // Delete project
  static async deleteProject(req, res) {
    try {
      const { id } = req.params;
      const project = await Project.findByIdAndDelete(id);

      if (!project) {
        return res.status(404).json({
          success: false,
          message: 'Project not found'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Project deleted successfully'
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error deleting project',
        error: error.message
      });
    }
  }

  // Toggle project status
  static async toggleProjectStatus(req, res) {
    try {
      const { id } = req.params;
      const project = await Project.findById(id);

      if (!project) {
        return res.status(404).json({
          success: false,
          message: 'Project not found'
        });
      }

      project.isActive = !project.isActive;
      await project.save();

      return res.status(200).json({
        success: true,
        message: `Project ${project.isActive ? 'activated' : 'deactivated'} successfully`,
        project
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error toggling project status',
        error: error.message
      });
    }
  }

  // Toggle featured status
  static async toggleFeaturedStatus(req, res) {
    try {
      const { id } = req.params;
      const project = await Project.findById(id);

      if (!project) {
        return res.status(404).json({
          success: false,
          message: 'Project not found'
        });
      }

      project.isFeatured = !project.isFeatured;
      await project.save();

      return res.status(200).json({
        success: true,
        message: `Project ${project.isFeatured ? 'marked as featured' : 'removed from featured'} successfully`,
        project
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error toggling featured status',
        error: error.message
      });
    }
  }

  // Update project impact
  static async updateProjectImpact(req, res) {
    try {
      const { id } = req.params;
      const impactData = req.body;

      const project = await Project.findByIdAndUpdate(
        id,
        { impact: impactData, updatedAt: new Date() },
        { new: true, runValidators: true }
      );

      if (!project) {
        return res.status(404).json({
          success: false,
          message: 'Project not found'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Project impact updated successfully',
        project
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error updating project impact',
        error: error.message
      });
    }
  }

}

export default ProjectController;

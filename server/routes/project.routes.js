import express from "express";
import multer from "multer";
import ProjectController from "../Controller/project.js"; // no instance needed
import { uploadMultiple } from "../util/multer.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Error handling middleware for file uploads
const handleUploadErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ success: false, message: "File size is too large" });
    }
    if (err.code === "LIMIT_FILE_COUNT") {
      return res
        .status(400)
        .json({ success: false, message: "Too many files uploaded" });
    }
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      return res
        .status(400)
        .json({ success: false, message: "Unexpected file type or field name" });
    }
    return res.status(400).json({ success: false, message: err.message });
  } else if (err) {
    return res
      .status(500)
      .json({ success: false, message: "Error uploading files" });
  }
  next();
};

// ---------------- Public Routes ----------------

// Get all projects
router.get("/project/get", ProjectController.getProjects);

// Get single project by ID
router.get("/project/get/:id", ProjectController.getProjectById);

// Get projects by category
router.get("/project/category/:category", ProjectController.getProjectsByCategory);

// Get featured projects
router.get("/project/featured", ProjectController.getFeaturedProjects);

// ---------------- Admin Protected Routes ----------------

// Add new project
router.post(
  "/project/add",
  auth,
  (req, res, next) => {
    const upload = uploadMultiple([
      { name: "images", maxCount: 10 },
      { name: "documents", maxCount: 5 },
    ]);

    upload(req, res, (err) => {
      if (err) return handleUploadErrors(err, req, res, next);
      next();
    });
  },
  ProjectController.addProject
);

// Update project
router.put(
  "/project/update/:id",
  auth,
  (req, res, next) => {
    const upload = uploadMultiple([
      { name: "images", maxCount: 10 },
      { name: "documents", maxCount: 5 },
    ]);

    upload(req, res, (err) => {
      if (err) return handleUploadErrors(err, req, res, next);
      next();
    });
  },
  ProjectController.updateProject
);

// Delete project
router.delete("/project/delete/:id", auth, ProjectController.deleteProject);

// Toggle project status
router.patch("/project/toggle-status/:id", auth, ProjectController.toggleProjectStatus);

// Toggle featured status
router.patch("/project/toggle-featured/:id", auth, ProjectController.toggleFeaturedStatus);

// Update project impact
router.post("/project/impact/:id", auth, ProjectController.updateProjectImpact);

// Add project partner
router.post("/project/partner/:id", auth, ProjectController.addProjectPartner);

// Remove project partner
router.delete(
  "/project/partner/:id/:partnerId",
  auth,
  ProjectController.removeProjectPartner
);

export default router;

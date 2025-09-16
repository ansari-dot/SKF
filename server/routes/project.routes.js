import express from "express";
import ProjectController from "../Controller/project.js";
import upload from "../util/multer.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// ✅ Get all projects (Admin & User)
router.get("/project/get", ProjectController.getProjects);

// ✅ Add new project (Admin only) - with image upload
router.post("/project/add", auth, upload.single('image'), ProjectController.addProject);

// ✅ Update project (Admin only)
router.put("/project/update/:id", auth, upload.single('image'), ProjectController.updateProject);

// ✅ Delete project (Admin only)
router.delete("/project/delete/:id", auth, ProjectController.deleteProject);

export default router;
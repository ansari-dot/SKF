import express from "express";
import VolunteerController from "../Controller/volunteer.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// 🔹 Create a new volunteer (public - no auth required)
router.post("/volunteer/add", VolunteerController.createVolunteer);

// 🔹 Get all volunteers (admin only)
router.get("/volunteer/get", auth, VolunteerController.getAllVolunteers);

// 🔹 Update volunteer read status (admin only)
router.patch("/volunteer/read-status/:id", auth, VolunteerController.setReadStatus);

// 🔹 Delete a volunteer by ID (admin only)
router.delete("/volunteer/delete/:id", auth, VolunteerController.deleteVolunteer);

export default router;
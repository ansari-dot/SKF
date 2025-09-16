import express from "express";
import PartnershipController from "../Controller/partnership.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Create partnership (public - no auth required)
router.post("/partnership/add", PartnershipController.createPartnership);

//  Get all partnerships  for  admin only
router.get("/partnership/get", auth, PartnershipController.getAllPartnerships);

// Update partnership read status (Admin only)
router.patch("/partnership/read-status/:id", auth, PartnershipController.setReadStatus);

// Delete partnership (admin only)
router.delete("/partnership/delete/:id", auth, PartnershipController.deletePartnership);

export default router;
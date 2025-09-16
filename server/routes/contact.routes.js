import express from "express";
import ContactController from "../Controller/contact.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Public route to submit contact form
router.post("/contact/add", ContactController.createContact);

// Get all contacts (Admin only)
router.get("/contact/get", auth, ContactController.getContacts);

// Update contact read status (Admin only)
router.patch("/contact/read-status/:id", auth, ContactController.setReadStatus);

// Delete contact (Admin only)
router.delete("/contact/delete/:id", auth, ContactController.deleteContact);

export default router;
import express from "express";
import MediaController from "../Controller/media.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Public
router.get("/media/get", MediaController.getAllMedia);
router.get("/media/get/:id", MediaController.getMediaById);

// Admin protected
router.post("/media/add", auth, MediaController.createMedia);
router.put("/media/update/:id", auth, MediaController.updateMedia);
router.delete("/media/delete/:id", auth, MediaController.deleteMedia);

export default router;
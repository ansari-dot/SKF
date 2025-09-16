import express from "express";
import FeaturedEventController from "../Controller/featuredEvent.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Public
router.get("/featured-event/latest", FeaturedEventController.getLatestFeaturedEvent);

// Admin protected
router.get("/featured-event/all", auth, FeaturedEventController.getAllFeaturedEvents);
router.get("/featured-event/:id", auth, FeaturedEventController.getFeaturedEventById);
router.post("/featured-event/add", auth, FeaturedEventController.createFeaturedEvent);
router.put("/featured-event/update/:id", auth, FeaturedEventController.updateFeaturedEvent);
router.delete("/featured-event/delete/:id", auth, FeaturedEventController.deleteFeaturedEvent);

export default router;

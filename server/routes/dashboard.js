import express from "express";
import {
    getDashboardStats,
    getRealTimeMetrics,
    getMonthlyTrends,
} from "../Controller/dashboard.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// All dashboard routes require authentication
router.use(auth);

// @route   GET /api/dashboard/stats
// @desc    Get comprehensive dashboard statistics
// @access  Private (Admin only)
router.get("/stats", getDashboardStats);

// @route   GET /api/dashboard/realtime
// @desc    Get real-time metrics
// @access  Private (Admin only)
router.get("/realtime", getRealTimeMetrics);

// @route   GET /api/dashboard/trends
// @desc    Get monthly trends data
// @access  Private (Admin only)
router.get("/trends", getMonthlyTrends);

export default router;
import express from "express";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/roleMiddleware.js";
import analyticsController from "../controllers/analyticsController.js";

const router = express.Router();

router.get("/overview", protect, adminOnly, analyticsController.getOverview);
router.get("/demographics", protect, adminOnly, analyticsController.getDemographics);
router.get("/event/:id", protect, adminOnly, analyticsController.getEventAnalytics);

// Export reports
router.get("/export/csv", protect, adminOnly, analyticsController.exportTicketsCSV);
router.get("/export/excel", protect, adminOnly, analyticsController.exportTicketsExcel);

export default router;


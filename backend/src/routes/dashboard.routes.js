import express from "express";

const router = express.Router();

// 🔹 Get Dashboard Summary
// Route: GET /api/dashboard/summary
// Returns: total suspected, total confirmed, active outbreaks, disease breakdown
// Admin only.
router.get("/summary", (req, res) => {
  res.status(200).json({ message: "Dashboard summary" });
});

// 🔹 Get Geo Cluster Data
// Route: GET /api/dashboard/heatmap
// Returns: case locations, grouped by disease
// Admin only.
router.get("/heatmap", (req, res) => {
  res.status(200).json({ message: "Geo cluster heatmap data" });
});

export default router;

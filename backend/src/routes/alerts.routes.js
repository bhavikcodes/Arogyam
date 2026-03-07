import express from "express";

const router = express.Router();

// 🔹 Get Current Alerts
// Route: GET /api/alerts
// Admin only.
router.get("/", (req, res) => {
  res.status(200).json({ message: "List of current alerts" });
});

export default router;

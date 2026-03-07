import express from "express";
import { create } from "../controllers/authController.js";
const router = express.Router();

// 🔹 Create Community / Hospital User (Admin Only)
router.route("/create").post(create);

// 🔹 Get Current User Profile
// Route: GET /api/users/me
// Protected: any logged-in user
// router.get("/me", (req, res) => {
//   res.status(200).json({ message: "Current user profile" });
// });

// 🔹 Update Profile
// Route: PUT /api/users/me
// Protected: citizen only (or allow all roles carefully)
// router.put("/me", (req, res) => {
//   res.status(200).json({ message: "Profile updated" });
// });

export default router;

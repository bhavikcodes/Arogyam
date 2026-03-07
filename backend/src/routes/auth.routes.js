import express from "express";
import {
  register,
  login,
  hospitalLogin,
} from "../controllers/authController.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/hospitalLogin").post(hospitalLogin);

export default router;

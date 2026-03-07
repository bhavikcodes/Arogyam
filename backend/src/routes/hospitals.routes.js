import express from "express";
import {
  createHospital,
  getHospitals,
} from "../controllers/hospitalController.js";

const router = express.Router();

router.route("/").post(createHospital);

router.route("/").get(getHospitals);

export default router;

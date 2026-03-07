import express from "express";
import {
  createCase,
  getCases,
  confirmCase,
  getCasesHospital,
} from "../controllers/caseController.js";
const router = express.Router();

router.route("/").post(createCase);

router.route("/").get(getCases);

router.route("/byHospital").get(getCasesHospital);

router.route("/:id/confirm").put(confirmCase);

export default router;

import express from "express";
import { createSymptom, getAllSymptoms} from "../controllers/symptomController.js";

const router = express.Router();

router.route("/").get(getAllSymptoms);

router.route("/").post(createSymptom); // called only once for creating all symptoms

// TODO : implement update and delete later
// router.route("/:id").put(updateSymptom);
// router.route("/:id").delete(deleteSymptom);

export default router;

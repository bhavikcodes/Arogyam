import { Case } from "../models/case.js";
import { User } from "../models/user.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

const createCase = async (req, res) => {
  try {
    const {
      name,
      dateOfBirth,
      gender,
      phone,
      symptoms,
      caseType,
      source,
      location,
      severityLevel,
      createdBy,
    } = req.body;
    let user = await User.findOne({ phone: phone });
    if (!user) {
      try {
        const uuid = uuidv4();
        const hashedPassword = await bcrypt.hash(phone, 10);
        const newUser = new User({
          uuid,
          name,
          dateOfBirth,
          gender,
          role: "citizen",
          phone,
          password: hashedPassword,
          location,
        });
        await newUser.save();
      } catch (err) {
        console.log(err);
        return res
          .status(500)
          .json({ message: "Error creating user in createCase controller" });
      }
    }
    user = await User.findOne({ phone: phone });

    let parsedSymptoms = symptoms;
    if (typeof symptoms === "string") {
      try {
        parsedSymptoms = JSON.parse(symptoms);
      } catch (e) {
        console.error("Failed to parse symptoms:", e);
      }
    }

    // Extract actual id string if frontend sends { $oid: "..." }
    if (Array.isArray(parsedSymptoms)) {
      parsedSymptoms = parsedSymptoms.map((sym) =>
        sym && sym.$oid ? sym.$oid : sym,
      );
    }

    let creatorUser = null;
    if (createdBy) {
      creatorUser = await User.findById(createdBy);
    }

    let validLocation = location || (user && user.location);
    if (
      (!validLocation ||
        !validLocation.coordinates ||
        validLocation.coordinates.length < 2) &&
      creatorUser
    ) {
      validLocation = creatorUser.location;
    }

    if (
      validLocation &&
      (!validLocation.coordinates || validLocation.coordinates.length < 2)
    ) {
      validLocation = undefined;
    }

    const caseData = new Case({
      caseId: uuidv4(),
      patientId: user._id,
      symptoms: parsedSymptoms,
      caseType: caseType,
      source: source,
      severityLevel: severityLevel,
      location: validLocation,
      createdBy: createdBy || user._id,
    });
    await caseData.save();
    return res.status(201).json({ caseData });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error creating case in createCase controller" });
  }
};

const getCases = async (req, res) => {
  try {
    const { userId } = req.query;
    const user = await User.findById(userId);
    const role = user.role;
    if (role === "citizen") {
      const cases = await Case.find({ patientId: userId })
        .populate("symptoms")
        .populate("createdBy", "name role");
      return res.status(200).json({ cases });
    }
    if (role === "community") {
      const cases = await Case.find({ createdBy: userId })
        .populate("patientId")
        .populate("symptoms");
      return res.status(200).json({ cases });
    }
    if (role === "hospital") {
      const cases = await Case.find()
        .populate("patientId")
        .populate("symptoms")
        .populate("createdBy");
      return res.status(200).json({ cases });
    }
    if (role === "admin") {
      const cases = await Case.find()
        .populate("patientId")
        .populate("symptoms")
        .populate("createdBy");
      return res.status(200).json({ cases });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error getting cases in getCases controller" });
  }
};

const confirmCase = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (user.role !== "hospital") {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const caseData = await Case.findById(id);
    if (!caseData) {
      return res.status(404).json({ message: "Case not found" });
    }
    caseData.caseType = "confirmed";
    caseData.confirmedBy = userId;
    caseData.confirmedAt = Date.now();
    await caseData.save();
    return res.status(200).json({ caseData });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error confirming case in confirmCase controller" });
  }
};

const getCasesHospital = async (req, res) => {
  try {
    const cases = await Case.find()
      .populate("patientId")
      .populate("symptoms")
      .populate("createdBy");
    return res.status(200).json({ cases });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error getting cases in getCasesHospital controller" });
  }
};

export { createCase, getCases, confirmCase, getCasesHospital };

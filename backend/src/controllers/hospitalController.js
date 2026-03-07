import { Hospital } from "../models/hospital.js";
import bcrypt from "bcryptjs";

const createHospital = async (req, res) => {
  try {
    const { name, registrationNumber, password, type, address, location } =
      req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const hospital = new Hospital({
      name,
      registrationNumber,
      password: hashedPassword,
      type,
      address,
      location,
    });
    await hospital.save();
    return res.status(201).json({ hospital });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error creating hospital in createHospital controller",
    });
  }
};

const getHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    return res.status(200).json({ hospitals });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error getting hospitals in getHospitals controller",
    });
  }
};

export { createHospital, getHospitals };

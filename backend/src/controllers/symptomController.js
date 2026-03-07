import { Symptom } from "../models/symptom.js";

const createSymptom = async (req, res) => {
  try {
    const symptom = new Symptom(req.body);
    try {
      await symptom.save();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "symptom not saved in database" });
    }
    res.status(201).json(symptom);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error in createSymptom" });
  }
};

const getAllSymptoms = async (req, res) => {
  try {
    const symptoms = await Symptom.find();
    const formattedSymptoms = symptoms.map((symptom) => {
      return {
        _id: symptom._id,
        formatted: `${symptom.category} | ${symptom.code} | ${symptom.name}`,
      };
    });
    res.status(200).json(formattedSymptoms);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export { createSymptom, getAllSymptoms };

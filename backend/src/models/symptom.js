import mongoose from "mongoose";

const symptomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true // e.g., "FEV", "COU", "Nausea" -> "NAU"
  },
  category: {
    type: String,
    enum: [
      'respiratory',  
      'ent',
      'cardiovascular',
      'mouth',
      'gastrointestinal', 
      'genitourinary',
      'musculoskeletal',
      'reproductive',
      'insect',
      'neurological',     
      'skin',             
      'general',          
      'other'
    ],
    required: true
  },
  warningThreshold: {
    type: Number,
    default: 0,
    description: "Number of reports to trigger an early warning alert"
  },
  criticalThreshold: {
    type: Number,
    default: 0,
    description: "Number of reports to trigger a critical outbreak alert"
  }
}, {
  timestamps: true
});

const Symptom = mongoose.model("Symptom", symptomSchema);
export { Symptom };

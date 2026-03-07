import mongoose from "mongoose";

const caseSchema = new mongoose.Schema(
  {
    caseId: {
      type: String,
      required: true,
      unique: true,
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    symptoms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Symptom",
      },
    ],
    caseType: {
      type: String,
      enum: ["suspected", "confirmed"],
      required: true,
    },
    source: {
      type: String,
      enum: ["citizen", "community", "hospital"],
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "recovered", "closed"],
      default: "active",
    },
    severityLevel: {
      type: String,
      enum: ["mild", "moderate", "severe"],
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
      },
    },
    confirmedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    confirmedAt: {
      type: Date,
      default: null,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

caseSchema.index({ location: "2dsphere" });

const Case = mongoose.model("Case", caseSchema);
export { Case };

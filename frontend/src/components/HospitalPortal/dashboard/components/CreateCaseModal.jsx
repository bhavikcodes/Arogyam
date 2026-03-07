import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function CreateCaseModal({ isOpen, onClose, hospitalId }) {
  const [symptomsList, setSymptomsList] = useState([]);

  useEffect(() => {
    if (!isOpen) return;
    const fetchSymptoms = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/symptoms");
        if (res.ok) {
          const data = await res.json();
          setSymptomsList(data);
        }
      } catch (err) {
        console.error("Failed to fetch symptoms:", err);
      }
    };
    fetchSymptoms();
  }, [isOpen]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    patientName: "",
    dateOfBirth: "",
    phone: "",
    gender: "male",
    symptoms: [],
    caseType: "suspected",
    severityLevel: "mild",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleSymptom = (symptomId) => {
    setFormData((prev) => {
      const isSelected = prev.symptoms.includes(symptomId);
      if (isSelected) {
        return {
          ...prev,
          symptoms: prev.symptoms.filter((s) => s !== symptomId),
        };
      } else {
        if (prev.symptoms.length >= 4) return prev; // Max 4 selection
        return { ...prev, symptoms: [...prev.symptoms, symptomId] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Prepare payload
    // Backend expects symptoms as an array or a stringified array.
    // We will pass an array of symptom IDs if we had them, or just string names for now.
    const payload = {
      name: formData.patientName,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      phone: formData.phone,
      symptoms: formData.symptoms,
      caseType: formData.caseType,
      source: "hospital",
      severityLevel: formData.severityLevel,
      createdBy: hospitalId, // Extracted from hospital ctx or props
    };

    try {
      const response = await fetch("http://localhost:3000/api/cases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Case created successfully:", data);
        onClose(); // Close modal on success
      } else {
        setError(data.message || "Failed to create case.");
      }
    } catch (err) {
      console.error("Error creating case:", err);
      setError("An error occurred while creating the case.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-xl font-bold text-slate-800">
            Register New Case
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
              {error}
            </div>
          )}
          <form
            id="create-case-form"
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 ml-1">
                Patient Name
              </label>
              <input
                type="text"
                name="patientName"
                required
                value={formData.patientName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                placeholder="Full Name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                  placeholder="10-digit number"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  required
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-2xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1 flex justify-between">
                <span>Symptoms</span>
                <span className="text-slate-400 font-normal">
                  Select up to 4 symptoms
                </span>
              </label>
              <div className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl max-h-48 overflow-y-auto">
                <div className="flex flex-wrap gap-2">
                  {symptomsList.map((symp) => {
                    const isSelected = formData.symptoms.includes(symp._id);
                    const isDisabled =
                      !isSelected && formData.symptoms.length >= 4;

                    return (
                      <button
                        key={symp._id}
                        type="button"
                        onClick={() => toggleSymptom(symp._id)}
                        disabled={isDisabled}
                        className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                          isSelected
                            ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                            : isDisabled
                              ? "bg-white text-slate-300 border-slate-100 cursor-not-allowed"
                              : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer"
                        }`}
                      >
                        {symp.formatted || symp.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 ml-1">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-2xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">
                  Case Type
                </label>
                <select
                  name="caseType"
                  value={formData.caseType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-2xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                >
                  <option value="suspected">Suspected</option>
                  <option value="confirmed">Confirmed</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">
                  Severity
                </label>
                <select
                  name="severityLevel"
                  value={formData.severityLevel}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-2xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                >
                  <option value="mild">Mild</option>
                  <option value="moderate">Moderate</option>
                  <option value="severe">Severe</option>
                </select>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-semibold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="create-case-form"
            disabled={isLoading}
            className="px-6 py-2.5 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? "Registering..." : "Register Case"}
          </button>
        </div>
      </div>
    </div>
  );
}

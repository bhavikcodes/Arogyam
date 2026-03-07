import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";

export function CreateCase() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [symptomsList, setSymptomsList] = useState([]);
  const [formData, setFormData] = useState({
    symptoms: [],
    severity: "",
    location: "",
  });
  const [symptomError, setSymptomError] = useState("");
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/symptoms`)
      .then((res) => setSymptomsList(res.data))
      .catch((err) => console.error("Failed to fetch symptoms:", err));
  }, []);

  const fetchLocation = () => {
    setIsFetchingLocation(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setFormData((prev) => ({
            ...prev,
            location: `Lat: ${pos.coords.latitude.toFixed(4)}, Lng: ${pos.coords.longitude.toFixed(4)}`,
          }));
          setIsFetchingLocation(false);
        },
        () => {
          alert("Could not fetch location.");
          setIsFetchingLocation(false);
        },
      );
    }
  };

  const handleSymptomToggle = (symptomId) => {
    setSymptomError(""); // Clear any previous error
    setFormData((prev) => {
      const isSelected = prev.symptoms.includes(symptomId);
      if (isSelected) {
        return {
          ...prev,
          symptoms: prev.symptoms.filter((id) => id !== symptomId),
        };
      } else {
        if (prev.symptoms.length >= 4) {
          setSymptomError("You can only select up to 4 symptoms.");
          return prev;
        }
        return { ...prev, symptoms: [...prev.symptoms, symptomId] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccess(false);

    let locPayload = formData.location;
    if (formData.location.startsWith("Lat:")) {
      const parts = formData.location
        .replace("Lat: ", "")
        .replace("Lng: ", "")
        .split(", ");
      if (parts.length === 2) {
        locPayload = {
          type: "Point",
          coordinates: [parseFloat(parts[1]), parseFloat(parts[0])],
        };
      }
    }

    try {
      const payload = {
        name: user.name,
        dateOfBirth: user.dateOfBirth || user.dob,
        gender: user.gender || "unknown",
        phone: user.phone,
        symptoms: formData.symptoms,
        caseType: "suspected",
        source: "citizen",
        severityLevel: formData.severity.toLowerCase(),
        location: locPayload,
        createdBy: user._id,
      };
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cases`,
        payload,
      );
      if (res.status === 201) {
        setSuccess(true);
        setFormData({
          symptoms: [],
          severity: "",
          location: "",
        });
      }
    } catch (err) {
      console.error("Error submitting case", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {t("createCase")}
      </h1>
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl mb-6 font-medium">
          ✅ Case registered successfully!
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-5"
      >
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {t("symptoms")}
          </label>

          {/* Selected Symptoms Display Box */}
          {formData.symptoms.length > 0 && (
            <div className="mb-4 p-3 bg-blue-50/50 border border-blue-100 rounded-lg flex flex-wrap gap-2 min-h-[50px] items-center">
              {formData.symptoms.map((id) => {
                const s = symptomsList.find((sym) => sym._id === id);
                if (!s) return null;
                return (
                  <span
                    key={id}
                    className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm overflow-hidden"
                  >
                    {s.formatted?.split(" | ").pop() || "Unknown"}
                    <button
                      type="button"
                      onClick={() => handleSymptomToggle(id)}
                      className="ml-1 hover:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-full h-4 w-4 inline-flex items-center justify-center transition-colors hover:bg-black/20"
                    >
                      &times;
                    </button>
                  </span>
                );
              })}
            </div>
          )}

          {/* Symptom Selection Grid */}
          <div className="flex flex-wrap gap-2">
            {symptomsList.map((s) => {
              const isSelected = formData.symptoms.includes(s._id);
              const isMaxed = formData.symptoms.length >= 4 && !isSelected;
              return (
                <button
                  type="button"
                  key={s._id}
                  onClick={() => handleSymptomToggle(s._id)}
                  disabled={isMaxed}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                    isSelected
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : isMaxed
                        ? "bg-gray-100 text-gray-400 border-gray-100 cursor-not-allowed"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {s.formatted?.split(" | ").pop() || "Unknown"}
                </button>
              );
            })}
          </div>
          {symptomError && (
            <p className="text-sm text-red-600 mt-2 font-medium">
              {symptomError}
            </p>
          )}
          <p className="text-xs text-gray-400 mt-2">
            Select up to 4 symptoms from the options above.
          </p>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Severity
          </label>
          <div className="flex gap-4">
            {["Mild", "Moderate", "Severe"].map((lvl) => (
              <label
                key={lvl}
                className="flex items-center gap-1.5 text-sm cursor-pointer"
              >
                <input
                  type="radio"
                  name="severity"
                  value={lvl}
                  checked={formData.severity === lvl}
                  onChange={(e) =>
                    setFormData({ ...formData, severity: e.target.value })
                  }
                  required
                />{" "}
                {lvl}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            {t("location")}
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              required
              value={formData.location}
              placeholder="Click Fetch →"
              className="w-full p-3 bg-gray-100 border rounded-lg text-sm outline-none"
            />
            <button
              type="button"
              onClick={fetchLocation}
              disabled={isFetchingLocation}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 disabled:opacity-50 whitespace-nowrap"
            >
              {isFetchingLocation ? "📍..." : "📍 Fetch"}
            </button>
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition disabled:opacity-70 flex justify-center items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>{" "}
              Submitting...
            </>
          ) : (
            t("submit")
          )}
        </button>
      </form>
    </div>
  );
}

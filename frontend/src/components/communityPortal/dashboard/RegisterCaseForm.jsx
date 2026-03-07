import React, { useState, useEffect } from "react";
import axios from "axios";

export default function RegisterCaseForm({ user, onAddCase }) {
  const [symptomsList, setSymptomsList] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    phone: "",
    symptoms: [],
    severity: "",
    location: "",
  });
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/symptoms`,
        );
        if (res.status === 200) {
          setSymptomsList(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch symptoms:", err);
      }
    };
    fetchSymptoms();
  }, []);

  const fetchLocation = () => {
    setIsFetchingLocation(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            location: `Lat: ${position.coords.latitude.toFixed(4)}, Lng: ${position.coords.longitude.toFixed(4)}`,
          });
          setIsFetchingLocation(false);
        },
        (error) => {
          alert("Could not fetch location. Please allow location permissions.");
          setIsFetchingLocation(false);
        },
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      setIsFetchingLocation(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

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
        name: formData.name,
        dateOfBirth: formData.dob,
        gender: formData.gender.toLowerCase(),
        phone: formData.phone,
        symptoms: formData.symptoms,
        caseType: "suspected",
        source: "community",
        severityLevel: formData.severity.toLowerCase(),
        location: locPayload,
        createdBy: user._id,
      };

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cases`,
        payload,
      );
      if (res.status === 201) {
        onAddCase(); // Refresh cases using the parent handler
        setFormData({
          name: "",
          dob: "",
          gender: "",
          phone: "",
          symptoms: [],
          severity: "",
          location: "",
        });
      }
    } catch (err) {
      console.error("Error submitting new case", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h2 className="text-xl font-bold mb-6 text-blue-800 border-b pb-2">
        Register New Case
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Patient Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2.5 bg-slate-50 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            value={formData.dob}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            className="w-full p-2.5 bg-slate-50 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Gender
          </label>
          <div className="flex gap-4">
            {["Male", "Female", "Other"].map((g) => (
              <label
                key={g}
                className="flex items-center gap-1 text-sm text-slate-600 cursor-pointer"
              >
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={formData.gender === g}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                  className="text-blue-600 focus:ring-blue-500"
                  required
                />{" "}
                {g}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="w-full p-2.5 bg-slate-50 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
            pattern="[0-9]{10}"
            placeholder="10-digit number"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Primary Symptom(s)
          </label>
          <select
            multiple
            value={formData.symptoms}
            onChange={(e) => {
              const options = Array.from(
                e.target.selectedOptions,
                (option) => option.value,
              );
              setFormData({ ...formData, symptoms: options });
            }}
            className="w-full p-2.5 bg-slate-50 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-32"
            required
          >
            <option value="" disabled>
              Select symptom(s)...
            </option>
            {symptomsList.map((symp) => (
              <option key={symp._id} value={symp._id}>
                {symp.formatted}
              </option>
            ))}
          </select>
          <p className="text-xs text-slate-500 mt-1">
            Hold Ctrl/Cmd to select multiple symptom options.
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Severity Level
          </label>
          <div className="flex gap-4">
            {["Mild", "Moderate", "Severe"].map((lvl) => (
              <label
                key={lvl}
                className="flex items-center gap-1 text-sm text-slate-600 cursor-pointer"
              >
                <input
                  type="radio"
                  name="severity"
                  value={lvl}
                  checked={formData.severity === lvl}
                  onChange={(e) =>
                    setFormData({ ...formData, severity: e.target.value })
                  }
                  className="text-blue-600 focus:ring-blue-500"
                  required
                />{" "}
                {lvl}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Patient Location
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={formData.location}
              readOnly
              placeholder="Click button to fetch ->"
              className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-600 outline-none"
              required
            />
            <button
              type="button"
              onClick={fetchLocation}
              disabled={isFetchingLocation}
              className="bg-slate-800 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-700 transition disabled:opacity-50 whitespace-nowrap"
            >
              {isFetchingLocation ? "📍..." : "📍 Fetch"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition shadow-md mt-4 disabled:opacity-70 flex justify-center items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Submitting...
            </>
          ) : (
            "Submit Patient Data"
          )}
        </button>
      </form>
    </div>
  );
}

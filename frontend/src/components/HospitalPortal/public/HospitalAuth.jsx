import React, { useState } from "react";
import { Lock, FileText, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HospitalAuth({ type, onSwitchType, onSuccess }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    registrationNumber: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (type === "login") {
        const response = await fetch(
          "http://localhost:3000/api/auth/hospitalLogin",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              registrationNumber: formData.registrationNumber,
              password: formData.password,
            }),
          },
        );

        const data = await response.json();

        console.log("Login API Response:", data);

        if (!response.ok) {
          throw new Error(data.message || "Login failed");
        }

        onSuccess(data);
        navigate("/hospital/dashboard", { state: { hospital: data.hospital } });
      } else {
        // Mock registration for now, or add registration API if provided later
        setTimeout(() => {
          console.log("Mock Registration Data:", formData);
          onSuccess();
          navigate("/hospital/dashboard");
        }, 1000);
      }
    } catch (err) {
      console.error("Login API Error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/40 w-full max-w-md relative overflow-hidden">
      {/* Glossy top edge highlight */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-50"></div>

      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          {type === "login" ? "Hospital Staff Login" : "Register Facility"}
        </h2>
        <p className="text-slate-500 text-sm">
          {type === "login"
            ? "Enter your credentials to access the portal."
            : "Register your hospital facility with Arogyam."}
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50/50 border border-red-100 rounded-2xl text-red-600 text-sm flex items-start gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></div>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-700 ml-1">
            Registration Number
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
              <FileText size={18} />
            </div>
            <input
              type="text"
              name="registrationNumber"
              required
              value={formData.registrationNumber}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
              placeholder="e.g. HOSP-12345"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between items-center ml-1">
            <label className="text-sm font-semibold text-slate-700">
              Password
            </label>
            {type === "login" && (
              <a
                href="#"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                Forgot password?
              </a>
            )}
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
              <Lock size={18} />
            </div>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 mt-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-2xl transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-slate-900/20"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              {type === "login" ? "Sign In" : "Register Facility"}
              <ChevronRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-slate-100 text-center">
        <p className="text-slate-500 text-sm">
          {type === "login"
            ? "Need to register your facility?"
            : "Already registered?"}{" "}
          <button
            type="button"
            onClick={onSwitchType}
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            {type === "login" ? "Create an account" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  );
}

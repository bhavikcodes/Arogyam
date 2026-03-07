import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";

export default function LoginModal({ closeModal }) {
  const { login } = useAuth();
  const [loginForm, setLoginForm] = useState({ phone: "", password: "" });
  const [loginError, setLoginError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        loginForm,
      );
      if (res.status === 200) {
        if (res.data.user.role !== "community") {
          setLoginError(
            "No user found with community worker access for this number.",
          );
          return;
        }

        login(res.data.user, res.data.token);
        closeModal();
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setLoginError(err.response.data.message);
      } else {
        setLoginError("An error occurred during login.");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-xl font-bold"
        >
          ✕
        </button>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Worker Login</h2>
          <p className="text-slate-500 text-sm">
            Access the Aarogyam Dashboard
          </p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          {loginError && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">
              {loginError}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-700">
              phone no.
            </label>
            <input
              type="text"
              value={loginForm.phone}
              onChange={(e) =>
                setLoginForm({ ...loginForm, phone: e.target.value })
              }
              placeholder="e.g. 9876543210"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50"
              pattern="\d{10}"
              title="Phone number must be exactly 10 digits"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-700">
              Password
            </label>
            <input
              type="password"
              value={loginForm.password}
              onChange={(e) =>
                setLoginForm({ ...loginForm, password: e.target.value })
              }
              placeholder="••••••••"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors mt-4"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

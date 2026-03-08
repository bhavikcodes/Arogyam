import React from "react";
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar({ onLoginClick }) {
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-40 h-16 flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center text-white font-bold text-lg">
            +
          </div>
          <span className="text-2xl font-extrabold text-slate-800 tracking-tight">
            Arogyam <span className="text-blue-600">Community Portal</span>
          </span>
        </div>

        <div className="flex items-center gap-6">
          {/* Cross-Portal Navigation */}
          {!isLoggedIn && (
            <div className="hidden md:flex items-center gap-4 text-sm font-medium mr-2">
              <Link
                to="/user"
                className="text-slate-600 hover:text-blue-600 transition-colors"
              >
                Citizen Portal
              </Link>
              <Link
                to="/hospital"
                className="text-slate-600 hover:text-blue-600 transition-colors"
              >
                Hospital Portal
              </Link>
            </div>
          )}

          <div>
            {isLoggedIn ? (
              <button
                onClick={logout}
                className="bg-red-50 text-red-600 px-5 py-2 rounded-lg font-semibold hover:bg-red-100 transition border border-red-200"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={onLoginClick}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

import React from "react";
import { Bell, LogOut, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HospitalNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Basic logout for now
    navigate("/hospital");
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10 sticky top-0 shadow-sm">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-700 to-indigo-700 rounded-xl flex items-center justify-center shadow-inner">
          <Activity className="text-white" size={20} />
        </div>
        <span className="text-xl font-bold text-slate-800 tracking-tight">
          Arogyam{" "}
          <span className="text-blue-700 font-semibold">Hospital Portal</span>
        </span>
      </div>

      <div className="flex items-center space-x-4">
        <button className="relative p-2 text-slate-500 hover:text-blue-600 transition-colors rounded-full hover:bg-slate-100">
          <Bell size={20} />
          {/* Notification Badge */}
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-6 w-px bg-slate-200"></div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut size={18} />
          <span>Log Out</span>
        </button>
      </div>
    </nav>
  );
}

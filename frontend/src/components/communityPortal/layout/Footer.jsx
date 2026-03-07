import React from "react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-6 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h3 className="text-lg font-bold flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full inline-block"></span>
            Aarogyam Portal
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Government Health Initiative © 2026
          </p>
        </div>
        <div className="flex gap-6 text-sm text-slate-300">
          <a href="#" className="hover:text-white transition">
            Ministry of Health
          </a>
          <a href="#" className="hover:text-white transition">
            Help & Support
          </a>
          <a href="#" className="hover:text-white transition">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}

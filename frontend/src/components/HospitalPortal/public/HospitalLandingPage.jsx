import React, { useState } from "react";
import HospitalAuth from "./HospitalAuth";
import { Stethoscope, Building2, ClipboardList } from "lucide-react";

export default function HospitalLandingPage() {
  const [authType, setAuthType] = useState("login");

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Navbar specifically for Hospital Landing Page */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10 sticky top-0">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-700 to-indigo-700 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <span className="text-2xl font-bold text-slate-800 tracking-tight">
            Arogyam <span className="text-blue-700">Hospital Portal</span>
          </span>
        </div>
        <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
          <a
            href="#"
            className="hover:text-blue-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            Guidelines
          </a>
          <a
            href="#"
            className="hover:text-blue-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            System Status
          </a>
          <a
            href="https://mohfw.gov.in"
            className="hover:text-blue-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            MoHFW Portal
          </a>
        </div>
      </nav>

      {/* Hero Section Split Layout */}
      <main className="flex-1 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-center p-6 lg:p-12 gap-12 lg:gap-24">
        {/* Left Side: Info */}
        <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
          <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold text-sm border border-indigo-100 uppercase tracking-wide">
            Official Hospital Gateway
          </div>
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
            Manage Care & Health Outcomes with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600">
              Arogyam
            </span>
          </h1>
          <p className="text-lg text-slate-600 max-w-lg mx-auto lg:mx-0">
            Securely access patient records, confirm disease diagnoses, update
            treatment statuses, and collaborate with the central health
            monitoring system to prevent outbreaks.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
            <div className="flex flex-col items-center lg:items-start text-left">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-700 mb-3">
                <ClipboardList size={24} />
              </div>
              <h3 className="font-bold text-slate-800">Case Management</h3>
              <p className="text-sm text-slate-500 mt-1">
                Confirm and track suspected cases
              </p>
            </div>
            <div className="flex flex-col items-center lg:items-start text-left">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-700 mb-3">
                <Building2 size={24} />
              </div>
              <h3 className="font-bold text-slate-800">Facility Insights</h3>
              <p className="text-sm text-slate-500 mt-1">
                Monitor local outbreak metrics easily
              </p>
            </div>
            <div className="flex flex-col items-center lg:items-start text-left">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 mb-3">
                <Stethoscope size={24} />
              </div>
              <h3 className="font-bold text-slate-800">Clinical Tools</h3>
              <p className="text-sm text-slate-500 mt-1">
                Advanced diagnostic reporting
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Auth Form */}
        <div className="lg:w-1/2 flex justify-center w-full relative">
          {/* Decorative blob behind the form */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-blue-300 to-indigo-200 rounded-full blur-3xl opacity-30 -z-10"></div>

          <HospitalAuth
            type={authType}
            onSwitchType={() =>
              setAuthType(authType === "login" ? "register" : "login")
            }
            onSuccess={() => {}} // Will handle AuthContext redirect later
          />
        </div>
      </main>
    </div>
  );
}

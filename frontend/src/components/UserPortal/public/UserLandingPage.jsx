import React, { useState } from "react";
import UserAuth from "./UserAuth";
import { HeartPulse, ShieldCheck, Activity } from "lucide-react";
import { Link } from "react-router-dom";

export default function UserLandingPage() {
  const [authType, setAuthType] = useState("login"); // 'login' or 'register'

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Navbar specifically for Landing Page */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10 sticky top-0">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <span className="text-2xl font-bold text-slate-800 tracking-tight">
            Arogyam <span className="text-blue-600">Citizen Portal</span>
          </span>
        </div>
        <div className="hidden md:flex gap-6 items-center text-sm font-medium text-slate-600">
          <Link
            to="/hospital"
            className="px-4 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition border border-blue-100 font-semibold"
          >
            Hospital Portal
          </Link>
          <Link
            to="/community"
            className="px-4 py-2 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition border border-green-100 font-semibold inline-flex items-center gap-2"
          >
            Community Portal
          </Link>
          <a
            href="#"
            className="hover:text-blue-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            About Us
          </a>
          <a
            href="https://www.myscheme.gov.in/search/category/Health%20%26%20Wellness"
            className="hover:text-blue-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            Health Schemes
          </a>
          <a
            href="https://mohfw.gov.in/?q=contactus/department-health-and-family-welfare-directory"
            className="hover:text-blue-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact Govt
          </a>
        </div>
      </nav>

      {/* Hero Section Split Layout */}
      <main className="flex-1 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-center p-6 lg:p-12 gap-12 lg:gap-24">
        {/* Left Side: Info */}
        <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 font-semibold text-sm border border-blue-100 uppercase tracking-wide">
            Citizen Health Portal
          </div>
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
            Take Control of Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">
              Health Journey
            </span>
          </h1>
          <p className="text-lg text-slate-600 max-w-lg mx-auto lg:mx-0">
            Securely access your medical records, connect with local health
            camps, chat with our AI assistant, and discover government schemes
            tailored just for you.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
            <div className="flex flex-col items-center lg:items-start text-left">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 mb-3">
                <HeartPulse size={24} />
              </div>
              <h3 className="font-bold text-slate-800">100% Secure</h3>
              <p className="text-sm text-slate-500 mt-1">
                End-to-end encrypted medical data
              </p>
            </div>
            <div className="flex flex-col items-center lg:items-start text-left">
              <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 mb-3">
                <Activity size={24} />
              </div>
              <h3 className="font-bold text-slate-800">Track Vitals</h3>
              <p className="text-sm text-slate-500 mt-1">
                Monitor your symptoms locally
              </p>
            </div>
            <div className="flex flex-col items-center lg:items-start text-left">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 mb-3">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-bold text-slate-800">Govt Backed</h3>
              <p className="text-sm text-slate-500 mt-1">
                Official state health initiative
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Auth Form */}
        <div className="lg:w-1/2 flex justify-center w-full relative">
          {/* Decorative blob behind the form */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-blue-200 to-green-200 rounded-full blur-3xl opacity-30 -z-10"></div>

          <UserAuth
            type={authType}
            onSwitchType={() =>
              setAuthType(authType === "login" ? "register" : "login")
            }
            onSuccess={() => {}} // AuthContext handles redirect inherently when isLoggedIn becomes true
          />
        </div>
      </main>
    </div>
  );
}

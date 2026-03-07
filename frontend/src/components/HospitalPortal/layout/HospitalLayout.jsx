import React from "react";
import { Outlet } from "react-router-dom";
import HospitalNavbar from "./HospitalNavbar";

export default function HospitalLayout() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <HospitalNavbar />
      <main className="flex-1 w-full max-w-7xl mx-auto p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}

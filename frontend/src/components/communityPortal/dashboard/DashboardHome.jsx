import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import RegisterCaseForm from "./RegisterCaseForm";
import CasesTable from "./CasesTable";

export default function DashboardHome() {
  const { user } = useAuth();
  const [cases, setCases] = useState([]);

  const fetchCases = async () => {
    if (!user) return;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/cases`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: { userId: user._id },
        },
      );
      if (res.status === 200) {
        setCases(res.data.cases || []);
      }
    } catch (err) {
      console.error("Failed to fetch cases:", err);
    }
  };

  useEffect(() => {
    fetchCases();
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Welcome, {user ? user.name : "Worker"}
        </h1>
        <p className="text-slate-500">
          Register new cases and monitor community health.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Registration Form (Takes up 4 columns) */}
        <div className="lg:col-span-4">
          <RegisterCaseForm user={user} onAddCase={fetchCases} />
        </div>

        {/* Case Table (Takes up 8 columns) */}
        <div className="lg:col-span-8">
          <CasesTable cases={cases} />
        </div>
      </div>
    </div>
  );
}

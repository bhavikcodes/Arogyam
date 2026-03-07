import React, { useState, useEffect } from "react";
import { ArrowLeft, Search, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UpdateCaseModal from "./components/UpdateCaseModal";

export default function HospitalRecords() {
  const navigate = useNavigate();
  const [cases, setCases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedCaseToUpdate, setSelectedCaseToUpdate] = useState(null);

  const openUpdateModalForCase = (caseItem) => {
    setSelectedCaseToUpdate(caseItem);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setSelectedCaseToUpdate(null);
    setIsUpdateModalOpen(false);
    fetchCases(); // Refresh list after potential updates
  };

  const fetchCases = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/cases/byHospital`,
      );
      const data = await response.json();

      if (response.ok) {
        const sortedCases = (data.cases || []).sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        setCases(sortedCases);
      } else {
        console.error("Failed to fetch cases:", data.message);
      }
    } catch (error) {
      console.error("Error fetching cases:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCases();
  }, []);

  const calculateAge = (dobString) => {
    if (!dobString) return "-";
    const dob = new Date(dobString);
    const ageDifMs = Date.now() - dob.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-semibold border border-red-100 flex items-center gap-1.5 w-fit">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>Active
          </span>
        );
      case "recovered":
        return (
          <span className="px-3 py-1 bg-yellow-50 text-yellow-600 rounded-full text-xs font-semibold border border-yellow-100 flex items-center gap-1.5 w-fit">
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
            Recovered
          </span>
        );
      case "closed":
        return (
          <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-semibold border border-emerald-100 flex items-center gap-1.5 w-fit">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
            Closed
          </span>
        );
      default:
        return <span>{status}</span>;
    }
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case "confirmed":
        return (
          <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-semibold">
            Confirmed
          </span>
        );
      case "suspected":
        return (
          <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-semibold">
            Suspected
          </span>
        );
      default:
        return <span>{type}</span>;
    }
  };

  const filteredCases = cases.filter((c) => {
    const pName = c.patientId?.name || "";
    const pPhone = c.patientId?.phone || "";
    const pId = c.caseId || "";
    const searchLower = searchTerm.toLowerCase();
    return (
      pName.toLowerCase().includes(searchLower) ||
      pPhone.toLowerCase().includes(searchLower) ||
      pId.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/hospital/dashboard")}
            className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Full Case Records
          </h1>
        </div>
        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl font-bold flex gap-2 items-center">
          Total Cases: <span>{cases.length}</span>
        </div>
      </div>

      {/* Toolbar / Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-slate-400" size={18} />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-xl leading-5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-colors sm:text-sm"
            placeholder="Search by patient name, phone, or case ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors">
          <Filter size={18} />
          Filter
        </button>
      </div>

      {/* Main Content Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden min-h-[500px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-max">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-100 whitespace-nowrap">
                <th className="px-6 py-4 font-semibold">Case ID</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Patient Info</th>
                <th className="px-6 py-4 font-semibold">Symptoms</th>
                <th className="px-6 py-4 font-semibold">Type</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                      <p>Loading full case records...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredCases.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    No matching case records found.
                  </td>
                </tr>
              ) : (
                filteredCases.map((c) => {
                  const patient = c.patientId || {};
                  const age = calculateAge(patient.dateOfBirth);
                  const dateStr = new Date(c.createdAt).toLocaleDateString([], {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  });
                  return (
                    <tr
                      key={c._id || c.caseId}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-6 py-4 text-xs font-mono text-slate-500">
                        {c.caseId?.slice(0, 8) || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {dateStr}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-900">
                            {patient.name || "Unknown"}
                          </span>
                          <span className="text-xs text-slate-500 mt-0.5">
                            {patient.phone || "-"} &bull; {age} yrs &bull;{" "}
                            <span className="capitalize">
                              {patient.gender || "-"}
                            </span>
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate">
                        {c.symptoms && c.symptoms.length > 0
                          ? c.symptoms.map((s) => s.name || s).join(", ")
                          : "None"}
                      </td>
                      <td className="px-6 py-4">{getTypeBadge(c.caseType)}</td>
                      <td className="px-6 py-4">{getStatusBadge(c.status)}</td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => openUpdateModalForCase(c)}
                          className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-3 py-1.5 rounded-lg font-semibold text-xs transition-colors"
                        >
                          View / Edit
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <UpdateCaseModal
        isOpen={isUpdateModalOpen}
        onClose={closeUpdateModal}
        selectedCase={selectedCaseToUpdate}
      />
    </div>
  );
}

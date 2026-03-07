import React, { useState, useEffect } from "react";
import { PlusCircle, Edit, FileText, MoreVertical } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import CreateCaseModal from "./components/CreateCaseModal";
import UpdateCaseModal from "./components/UpdateCaseModal";

export default function HospitalDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedCaseToUpdate, setSelectedCaseToUpdate] = useState(null);

  const openUpdateModalForCase = (caseItem = null) => {
    setSelectedCaseToUpdate(caseItem);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setSelectedCaseToUpdate(null);
    setIsUpdateModalOpen(false);
  };

  const [recentCases, setRecentCases] = useState([]);
  const [isLoadingCases, setIsLoadingCases] = useState(true);

  // Extract hospital info from navigation state
  const hospital = location.state?.hospital || {};
  const hospitalName = hospital.name || "Default Hospital";
  const hospitalRegNo = hospital.registrationNumber || "H-0000";
  const hospitalZone =
    hospital.address?.city || hospital.address?.district || "Unknown Zone";

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/cases/byHospital",
        );
        const data = await response.json();

        if (response.ok) {
          // Sort cases to get latest 10 (assuming createdAt exists)
          const sortedCases = (data.cases || []).sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
          );
          setRecentCases(sortedCases.slice(0, 10));
        } else {
          console.error("Failed to fetch cases:", data.message);
        }
      } catch (error) {
        console.error("Error fetching cases:", error);
      } finally {
        setIsLoadingCases(false);
      }
    };

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

  return (
    <div className="space-y-8">
      {/* Top Section: Hospital Info */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
          {hospitalName}
        </h1>
        <p className="text-slate-500 mt-2 font-medium flex gap-2 items-center">
          <span>
            Facility ID: <span className="text-slate-700">{hospitalRegNo}</span>
          </span>
          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
          <span>
            Zone:{" "}
            <span className="text-slate-700 capitalize">{hospitalZone}</span>
          </span>
        </p>
      </div>

      {/* Middle Section: Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all text-left flex flex-col group"
        >
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <PlusCircle size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-800">Create New Case</h3>
          <p className="text-sm text-slate-500 mt-1">
            Register a patient for a new suspected or confirmed diagnosis.
          </p>
        </button>

        <button
          onClick={() => openUpdateModalForCase(null)}
          className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all text-left flex flex-col group"
        >
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Edit size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-800">
            Update Existing Case
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Modify status or diagnosis for an already registered patient.
          </p>
        </button>

        <button
          onClick={() => navigate("/hospital/records")} // Placeholder link
          className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:border-purple-200 transition-all text-left flex flex-col group"
        >
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <FileText size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-800">Case Records</h3>
          <p className="text-sm text-slate-500 mt-1">
            View comprehensive list of all past cases handled by your facility.
          </p>
        </button>
      </div>

      {/* Bottom Section: Recent Cases Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-lg font-bold text-slate-800">Recent Cases</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-100">
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Phone</th>
                <th className="px-6 py-4 font-semibold">Age/Gender</th>
                <th className="px-6 py-4 font-semibold">Type</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoadingCases ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-8 text-center text-slate-500"
                  >
                    Loading cases...
                  </td>
                </tr>
              ) : recentCases.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-8 text-center text-slate-500"
                  >
                    No cases found for this hospital.
                  </td>
                </tr>
              ) : (
                recentCases.map((c) => {
                  const patient = c.patientId || {};
                  const age = calculateAge(patient.dateOfBirth);
                  return (
                    <tr
                      key={c._id || c.caseId}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-bold text-slate-900">
                        {patient.name || "Unknown"}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {patient.phone || "Unknown"}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {age} &bull;{" "}
                        <span className="capitalize">
                          {patient.gender || "Unknown"}
                        </span>
                      </td>
                      <td className="px-6 py-4">{getTypeBadge(c.caseType)}</td>
                      <td className="px-6 py-4">{getStatusBadge(c.status)}</td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => openUpdateModalForCase(c)}
                          className="text-indigo-600 hover:text-indigo-800 font-semibold text-sm"
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 text-center">
          <button
            onClick={() => navigate("/hospital/records")} // Placeholder link
            className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
          >
            View all past cases &rarr;
          </button>
        </div>
      </div>

      {/* Modals */}
      <CreateCaseModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        hospitalId={hospital._id || hospital.id}
      />
      <UpdateCaseModal
        isOpen={isUpdateModalOpen}
        onClose={closeUpdateModal}
        selectedCase={selectedCaseToUpdate}
      />
    </div>
  );
}

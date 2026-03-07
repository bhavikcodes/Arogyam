import React, { useState } from "react";
import { X, Search } from "lucide-react";

export default function UpdateCaseModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [searchPhone, setSearchPhone] = useState("");
  const [formData, setFormData] = useState({
    caseType: "suspected",
    status: "active",
  });

  const handleSearch = (e) => {
    e.preventDefault();
    // Simulate finding a case
    console.log("Searching for case with phone:", searchPhone);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Update Case Data:", { phone: searchPhone, ...formData });
    // Add API call later
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-xl font-bold text-slate-800">
            Update Existing Case
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Search Section */}
          <form onSubmit={handleSearch} className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 ml-1">
              Search Patient by Phone
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1 group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <Search size={18} />
                </div>
                <input
                  type="text"
                  value={searchPhone}
                  onChange={(e) => setSearchPhone(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all"
                  placeholder="Enter patient phone number"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-3 bg-indigo-50 text-indigo-700 font-semibold rounded-2xl hover:bg-indigo-100 transition-colors"
              >
                Find
              </button>
            </div>
          </form>

          <div className="h-px bg-slate-100 w-full" />

          {/* Update Details Form */}
          <form
            id="update-case-form"
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-700 ml-1">
                Case Type
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer bg-slate-50 px-4 py-3 rounded-xl border border-slate-200 w-full hover:border-indigo-300 transition-colors">
                  <input
                    type="radio"
                    name="caseType"
                    value="suspected"
                    checked={formData.caseType === "suspected"}
                    onChange={handleChange}
                    className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-slate-700 font-medium">Suspected</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer bg-slate-50 px-4 py-3 rounded-xl border border-slate-200 w-full hover:border-indigo-300 transition-colors">
                  <input
                    type="radio"
                    name="caseType"
                    value="confirmed"
                    checked={formData.caseType === "confirmed"}
                    onChange={handleChange}
                    className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-slate-700 font-medium">Confirmed</span>
                </label>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-700 ml-1">
                Status
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer bg-slate-50 px-4 py-3 rounded-xl border border-slate-200 w-full hover:border-indigo-300 transition-colors">
                  <input
                    type="radio"
                    name="status"
                    value="active"
                    checked={formData.status === "active"}
                    onChange={handleChange}
                    className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-slate-700 font-medium">Active</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer bg-slate-50 px-4 py-3 rounded-xl border border-slate-200 w-full hover:border-indigo-300 transition-colors">
                  <input
                    type="radio"
                    name="status"
                    value="recovered"
                    checked={formData.status === "recovered"}
                    onChange={handleChange}
                    className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-slate-700 font-medium mt-0.5">
                    Recovered
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer bg-slate-50 px-4 py-3 rounded-xl border border-slate-200 w-full hover:border-indigo-300 transition-colors">
                  <input
                    type="radio"
                    name="status"
                    value="closed"
                    checked={formData.status === "closed"}
                    onChange={handleChange}
                    className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-slate-700 font-medium mt-0.5">
                    Closed
                  </span>
                </label>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-semibold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="update-case-form"
            className="px-6 py-2.5 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

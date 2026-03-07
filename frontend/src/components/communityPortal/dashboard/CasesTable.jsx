import React from "react";

export default function CasesTable({ cases }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-5 bg-slate-50 border-b flex justify-between items-center">
        <h2 className="text-lg font-bold text-slate-800">
          Registered Cases History
        </h2>
        <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">
          Total: {cases.length}
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left whitespace-nowrap">
          <thead className="text-xs text-slate-500 uppercase bg-white border-b">
            <tr>
              <th className="px-6 py-4">Patient Info</th>
              <th className="px-6 py-4">Contact</th>
              <th className="px-6 py-4">Symptom & Severity</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {cases.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-8 text-center text-slate-500 text-sm"
                >
                  no case registerd
                </td>
              </tr>
            ) : (
              cases.map((c) => {
                // Handle formatted location
                let locDisplay = c.location;
                if (
                  c.location &&
                  typeof c.location === "object" &&
                  c.location.coordinates
                ) {
                  locDisplay = `Lat: ${c.location.coordinates[1].toFixed(4)}, Lng: ${c.location.coordinates[0].toFixed(4)}`;
                }

                // Handle date display
                let dateDisplay = c.date || c.createdAt;
                if (dateDisplay) {
                  dateDisplay = new Date(dateDisplay)
                    .toISOString()
                    .split("T")[0];
                }

                return (
                  <tr
                    key={c._id || c.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-800">
                        {c.patientId ? c.patientId.name : c.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {c.patientId ? c.patientId.gender : c.gender} • DOB:{" "}
                        {c.patientId
                          ? new Date(c.patientId.dateOfBirth)
                              .toISOString()
                              .split("T")[0]
                          : c.dob}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {c.patientId ? c.patientId.phone : c.phone}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-slate-800">
                        {Array.isArray(c.symptoms) && c.symptoms.length > 0
                          ? typeof c.symptoms[0] === "object"
                            ? c.symptoms.map((s) => s.name).join(", ")
                            : c.symptoms.join(", ")
                          : c.symptom || "N/A"}
                      </p>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          (c.severityLevel || c.severity) === "severe" ||
                          (c.severityLevel || c.severity) === "Severe"
                            ? "bg-red-100 text-red-700"
                            : (c.severityLevel || c.severity) === "moderate" ||
                                (c.severityLevel || c.severity) === "Moderate"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                        }`}
                      >
                        {c.severityLevel || c.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500 tracking-tighter">
                      {locDisplay}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {dateDisplay}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";

export function HealthRecords() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    axios
      .get("http://localhost:3000/api/cases", { params: { userId: user._id } })
      .then((res) => setCases(res.data.cases || []))
      .catch((err) => console.error("Failed to fetch:", err))
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {t("healthRecords")}
        </h1>
        <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">
          Total: {cases.length}
        </span>
      </div>

      {cases.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
          <p className="text-gray-500">No health records found yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {cases.map((c) => {
            let locDisplay = c.location;
            if (
              c.location &&
              typeof c.location === "object" &&
              c.location.coordinates
            ) {
              locDisplay = `${c.location.coordinates[1].toFixed(4)}, ${c.location.coordinates[0].toFixed(4)}`;
            }
            const dateDisplay =
              c.date || c.createdAt
                ? new Date(c.date || c.createdAt).toLocaleDateString()
                : "N/A";
            const severity = (
              c.severityLevel ||
              c.severity ||
              ""
            ).toLowerCase();

            return (
              <div
                key={c._id}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition"
              >
                {/* Registration Source Badge */}
                <div className="mb-3 flex items-center justify-between border-b border-gray-50 pb-2">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {c.createdBy?._id === user._id
                      ? "Registered by you"
                      : `Registered by ${c.createdBy?.name || "Community Worker"}`}
                  </span>
                  <div className="flex gap-2">
                    {c.caseType && (
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded uppercase ${c.caseType === "confirmed" ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-700"}`}
                      >
                        {c.caseType}
                      </span>
                    )}
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded uppercase ${severity === "severe" ? "bg-red-100 text-red-700" : severity === "moderate" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}
                    >
                      {c.severityLevel || c.severity}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div>
                    <p className="font-bold text-gray-900">
                      {c.patientId?.name || c.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-800">
                      {dateDisplay}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      📍 {locDisplay}
                    </p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-50">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">{t("symptoms")}:</span>{" "}
                    {Array.isArray(c.symptoms) && c.symptoms.length > 0
                      ? typeof c.symptoms[0] === "object"
                        ? c.symptoms.map((s) => s.name).join(", ")
                        : c.symptoms.join(", ")
                      : "N/A"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

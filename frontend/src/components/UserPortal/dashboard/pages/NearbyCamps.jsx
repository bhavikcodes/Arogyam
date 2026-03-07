import React from "react";
import { MapPin } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export function NearbyCamps() {
  const { t } = useLanguage();
  const camps = [
    {
      name: "PHC Andheri East",
      distance: "1.2 km",
      type: "Primary Health Center",
      timing: "9 AM - 5 PM",
      address: "Near Andheri Station, Mumbai",
    },
    {
      name: "District Hospital Thane",
      distance: "4.8 km",
      type: "District Hospital",
      timing: "24/7",
      address: "Thane West, Mumbai",
    },
    {
      name: "Mobile Health Unit - Ward 7",
      distance: "0.8 km",
      type: "Mobile Unit",
      timing: "10 AM - 3 PM",
      address: "Community Ground, Ward 7",
    },
    {
      name: "Ayushman Health Camp",
      distance: "2.1 km",
      type: "Government Camp",
      timing: "8 AM - 2 PM",
      address: "Municipal School Ground",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {t("nearbyCamps")}
      </h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {camps.map((camp, i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-800">{camp.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{camp.type}</p>
                <p className="text-sm text-gray-500">{camp.address}</p>
                <p className="text-sm text-gray-500 mt-1">🕐 {camp.timing}</p>
              </div>
              <div className="flex items-center gap-1 text-blue-600 bg-blue-50 px-2 py-1 rounded-lg text-xs font-bold">
                <MapPin className="w-3 h-3" /> {camp.distance}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

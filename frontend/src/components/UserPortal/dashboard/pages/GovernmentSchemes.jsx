import React from "react";
import { FileCheck, ExternalLink } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export function GovernmentSchemes() {
  const { t } = useLanguage();
  const schemes = [
    {
      name: "Ayushman Bharat - PMJAY",
      desc: "Free health cover up to ₹5 lakh per family per year for secondary and tertiary care.",
      link: "https://pmjay.gov.in",
      tag: "Central",
    },
    {
      name: "Janani Suraksha Yojana",
      desc: "Cash assistance for institutional delivery to promote safe motherhood.",
      link: "https://nhm.gov.in",
      tag: "Central",
    },
    {
      name: "Rashtriya Bal Swasthya Karyakram",
      desc: "Free health screening & treatment for children aged 0–18 years.",
      link: "https://nhm.gov.in",
      tag: "Central",
    },
    {
      name: "Mahatma Jyotiba Phule Jan Arogya Yojana",
      desc: "Cashless treatment for BPL families in empanelled hospitals.",
      link: "https://www.jeevandayee.gov.in",
      tag: "State",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {t("govSchemes")}
      </h1>
      <div className="grid gap-4">
        {schemes.map((s, i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition"
          >
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileCheck className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{s.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{s.desc}</p>
                </div>
              </div>
              <span
                className={`text-xs font-bold px-2 py-1 rounded-full ${s.tag === "Central" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}`}
              >
                {s.tag}
              </span>
            </div>
            <a
              href={s.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-sm text-blue-600 font-medium hover:underline"
            >
              Learn More <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

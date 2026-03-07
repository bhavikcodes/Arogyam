import React, { createContext, useContext, useState, useEffect } from "react";

const CasesContext = createContext(undefined);

export const CasesProvider = ({ children }) => {
  const [cases, setCases] = useState(() => {
    // Load from localStorage on initial mount
    const saved = localStorage.getItem("healthCases");
    if (saved) {
      return JSON.parse(saved);
    }
    // Initial mock data
    return [
      {
        id: "CR001",
        date: "2026-02-25",
        name: "Ramesh Kumar",
        age: "35",
        gender: "male",
        type: "Fever",
        symptoms: "High fever, body pain, headache",
        duration: "3-5 days",
        location: "Dharavi",
        pincode: "400017",
        contact: "9876543210",
        diagnosis: "Viral Fever",
        status: "under-observation",
      },
      {
        id: "CR002",
        date: "2026-02-15",
        name: "Priya Sharma",
        age: "28",
        gender: "female",
        type: "Cough",
        symptoms: "Dry cough, throat irritation",
        duration: "1 week",
        location: "Kurla",
        pincode: "400070",
        contact: "9876543211",
        diagnosis: "Upper Respiratory Infection",
        status: "resolved",
      },
    ];
  });

  // Save to localStorage whenever cases change
  useEffect(() => {
    localStorage.setItem("healthCases", JSON.stringify(cases));
  }, [cases]);

  const addCase = (caseData) => {
    const newCase = {
      ...caseData,
      id: `CR${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      date: new Date().toISOString().split("T")[0],
      diagnosis: "Pending Medical Review",
      status: "active",
    };
    setCases((prev) => [newCase, ...prev]);
    return newCase.id;
  };

  return (
    <CasesContext.Provider value={{ cases, addCase }}>
      {children}
    </CasesContext.Provider>
  );
};

export const useCases = () => {
  const context = useContext(CasesContext);
  if (context === undefined) {
    throw new Error("useCases must be used within a CasesProvider");
  }
  return context;
};

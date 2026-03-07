import React, { createContext, useContext, useState } from "react";

export const translations = {
  appName: {
    en: "Arogyam",
    hi: "आरोग्यम",
    mr: "आरोग्यम",
    gu: "આરોગ્યમ",
    ta: "ஆரோக்யம்",
  },
  home: {
    en: "Home",
    hi: "होम",
    mr: "मुख्यपृष्ठ",
    gu: "હોમ",
    ta: "முகப்பு",
  },
  createCase: {
    en: "Create Case",
    hi: "मामला दर्ज करें",
    mr: "प्रकरण तयार करा",
    gu: "કેસ બનાવો",
    ta: "வழக்கு உருவாக்கு",
  },
  healthRecords: {
    en: "Health Records",
    hi: "स्वास्थ्य रिकॉर्ड",
    mr: "आरोग्य नोंदी",
    gu: "આરોગ્ય રેકોર્ડ્સ",
    ta: "சுகாதார பதிவுகள்",
  },
  nearbyCamps: {
    en: "Nearby Camps",
    hi: "आस-पास के कैंप",
    mr: "जवळचे शिबिर",
    gu: "નજીકના કેમ્પ",
    ta: "அருகிலுள்ள முகாம்கள்",
  },
  govSchemes: {
    en: "Government Schemes",
    hi: "सरकारी योजनाएं",
    mr: "सरकारी योजना",
    gu: "સરકારી યોજનાઓ",
    ta: "அரசு திட்டங்கள்",
  },
  healthVideos: {
    en: "Health Awareness",
    hi: "स्वास्थ्य जागरूकता",
    mr: "आरोग्य जागरूकता",
    gu: "આરોગ્ય જાગૃતિ",
    ta: "சுகாதார விழிப்புணர்வு",
  },
  welcome: {
    en: "Welcome to Aarogyam",
    hi: "आरोग्यम में आपका स्वागत है",
    mr: "आरोग्यमध्ये आपले स्वागत आहे",
    gu: "આરોગ્યમમાં આપનું સ્વાગત છે",
    ta: "ஆரோக்யத்திற்கு வரவேற்கிறோம்",
  },
  welcomeSubtitle: {
    en: "Disease Surveillance & Health Management System",
    hi: "रोग निगरानी और स्वास्थ्य प्रबंधन प्रणाली",
    mr: "रोग निगराणी आणि आरोग्य व्यवस्थापन प्रणाली",
    gu: "રોગ નિરીક્ષણ અને આરોગ્ય વ્યવસ્થાપન સિસ્ટમ",
    ta: "நோய் கண்காணிப்பு மற்றும் சுகாதார மேலாண்மை அமைப்பு",
  },
  reportSymptoms: {
    en: "Report Your Symptoms",
    hi: "अपने लक्षण दर्ज करें",
    mr: "आपली लक्षणे नोंदवा",
    gu: "તમારા લક્ષણો જાણ કરો",
    ta: "உங்கள் அறிகுறிகளை தெரிவிக்கவும்",
  },
  viewRecords: {
    en: "View Health Records",
    hi: "स्वास्थ्य रिकॉर्ड देखें",
    mr: "आरोग्य नोंदी पहा",
    gu: "આરોગ્ય રેકોર્ડ્સ જુઓ",
    ta: "சுகாதார பதிவுகளை காண்க",
  },
  findCamps: {
    en: "Find Nearby Camps",
    hi: "नजदीकी कैंप खोजें",
    mr: "जवळचे शिबिर शोधा",
    gu: "નજીકના કેમ્પ શોધો",
    ta: "அருகிலுள்ள முகாம்களை கண்டறியவும்",
  },
  exploreSchemes: {
    en: "Explore Gov Schemes",
    hi: "सरकारी योजनाएं देखें",
    mr: "सरकारी योजना पहा",
    gu: "સરકારી યોજનાઓ",
    ta: "அரசு திட்டங்கள்",
  },
  symptoms: {
    en: "Symptoms",
    hi: "लक्षण",
    mr: "लक्षणे",
    gu: "લક્ષણો",
    ta: "அறிகுறிகள்",
  },
  location: {
    en: "Location",
    hi: "स्थान",
    mr: "स्थान",
    gu: "સ્થાન",
    ta: "இடம்",
  },
  submit: {
    en: "Submit",
    hi: "जमा करें",
    mr: "सबमिट करा",
    gu: "સબમિટ કરો",
    ta: "சமர்ப்பிக்கவும்",
  },
  aiChatbot: {
    en: "AI Health Assistant",
    hi: "एआई स्वास्थ्य सहायक",
    mr: "एआय आरोग्य सहाय्यक",
    gu: "એઆઈ આરોગ્ય સહાયક",
    ta: "AI சுகாதார உதவியாளர்",
  },
  welcomeBack: {
    en: "Welcome back",
    hi: "वापसी पर स्वागत है",
    mr: "पुन्हा स्वागत आहे",
    gu: "ફરીથી સ્વાગત છે",
    ta: "மீண்டும் வருக",
  },
  dashboardDesc: {
    en: "Your health dashboard is up to date. Here's what's happening today.",
    hi: "आपका स्वास्थ्य नियंत्रण-पट्ट अप-टू-डेट है। यहाँ आज क्या हो रहा है।",
    mr: "तुमचे आरोग्य डॅशबोर्ड अद्ययावत आहे. आजचे ताजे अपडेट्स येथे पहा.",
    gu: "તમારું આરોગ્ય ડેશબોર્ડ અપ-ટૂ-ડેટ છે. આજે શું થઈ રહ્યું છે તે જુઓ.",
    ta: "உங்கள் சுகாதார டேஷ்போர்டு புதுப்பிக்கப்பட்டுள்ளது.",
  },
  activeCases: {
    en: "Active Cases",
    hi: "सक्रिय मामले",
    mr: "सक्रिय प्रकरणे",
    gu: "સક્રિય કેસો",
    ta: "செயலில் உள்ள வழக்குகள்",
  },
  records: {
    en: "Records",
    hi: "रिकॉर्ड्स",
    mr: "नोंदी",
    gu: "રેકોર્ડ્સ",
    ta: "பதிவுகள்",
  },
  alerts: {
    en: "Alerts",
    hi: "चेतावनी",
    mr: "सतर्कता",
    gu: "ચેતવણીઓ",
    ta: "எச்சரிக்கைகள்",
  },
  quickActions: {
    en: "Quick Actions",
    hi: "त्वरित कार्रवाई",
    mr: "त्वरित कृती",
    gu: "ઝડપી ક્રિયાઓ",
    ta: "விரைவான செயல்கள்",
  },
  registerCase: {
    en: "Register a Case",
    hi: "मामला दर्ज करें",
    mr: "प्रकरण नोंदवा",
    gu: "કેસ નોંધો",
    ta: "ஒரு வழக்கை பதிவு செய்",
  },
};

const LanguageContext = createContext(undefined);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  const t = (key) => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

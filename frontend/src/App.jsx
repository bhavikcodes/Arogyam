import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { LanguageProvider as UserLanguageProvider } from "./components/UserPortal/context/LanguageContext";
import Community from "./components/communityPortal/Community";
import { UserLayout } from "./components/UserPortal/layout/UserLayout";
import UserLandingPage from "./components/UserPortal/public/UserLandingPage";
import { Home as UserDashboardHome } from "./components/UserPortal/dashboard/pages/Home";
import { CreateCase as UserCreateCase } from "./components/UserPortal/dashboard/pages/CreateCase";
import { HealthRecords } from "./components/UserPortal/dashboard/pages/HealthRecords";
import { NearbyCamps } from "./components/UserPortal/dashboard/pages/NearbyCamps";
import { GovernmentSchemes } from "./components/UserPortal/dashboard/pages/GovernmentSchemes";
import { HealthVideos } from "./components/UserPortal/dashboard/pages/HealthVideos";
import HospitalLandingPage from "./components/HospitalPortal/public/HospitalLandingPage";
import HospitalLayout from "./components/HospitalPortal/layout/HospitalLayout";
import HospitalDashboard from "./components/HospitalPortal/dashboard/HospitalDashboard";
import HospitalRecords from "./components/HospitalPortal/dashboard/HospitalRecords";
import Chatbot from "./components/Chatbot/Chatbot";

// Auth Guard Wrapper for User Portal
const ProtectedUserRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return <UserLandingPage />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/community" element={<Community />} />

        {/* Hospital Portal Routes */}
        <Route path="/hospital" element={<HospitalLandingPage />} />
        <Route path="/hospital/dashboard" element={<HospitalLayout />}>
          <Route index element={<HospitalDashboard />} />
          <Route path="records" element={<HospitalRecords />} />
        </Route>

        <Route
          path="/user"
          element={
            <UserLanguageProvider>
              <ProtectedUserRoute>
                <UserLayout />
              </ProtectedUserRoute>
            </UserLanguageProvider>
          }
        >
          <Route index element={<UserDashboardHome />} />
          <Route path="create-case" element={<UserCreateCase />} />
          <Route path="health-records" element={<HealthRecords />} />
          <Route path="nearby-camps" element={<NearbyCamps />} />
          <Route path="government-schemes" element={<GovernmentSchemes />} />
          <Route path="health-videos" element={<HealthVideos />} />
        </Route>
        <Route path="*" element={<Navigate to="/user" replace />} />
      </Routes>
      <Chatbot />
    </Router>
  );
}

export default App;

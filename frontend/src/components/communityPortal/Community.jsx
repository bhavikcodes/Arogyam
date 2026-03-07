import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import LandingPage from "./public/LandingPage";
import LoginModal from "./public/LoginModal";
import DashboardHome from "./dashboard/DashboardHome";

export default function Community() {
  const { isLoggedIn } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <Navbar onLoginClick={() => setShowLoginModal(true)} />

      <main className="flex-grow pt-16">
        {isLoggedIn ? <DashboardHome /> : <LandingPage />}
      </main>

      <Footer />

      {/* Login Modal Overlay */}
      {showLoginModal && (
        <LoginModal closeModal={() => setShowLoginModal(false)} />
      )}
    </div>
  );
}

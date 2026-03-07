import { Outlet, Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  MessageCircle,
  Home,
  FileText,
  Heart,
  MapPin,
  FileCheck,
  Video,
} from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../../../context/AuthContext";

export function UserLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const { user, logout } = useAuth(); // Globally grab User Data

  const navigation = [
    { name: t("home"), href: "/user", icon: Home },
    { name: t("createCase"), href: "/user/create-case", icon: FileText },
    { name: t("healthRecords"), href: "/user/health-records", icon: Heart },
    { name: t("nearbyCamps"), href: "/user/nearby-camps", icon: MapPin },
    {
      name: t("govSchemes"),
      href: "/user/government-schemes",
      icon: FileCheck,
    },
    { name: t("healthVideos"), href: "/user/health-videos", icon: Video },
  ];

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिंदी" },
    { code: "mr", name: "मराठी" },
    { code: "gu", name: "ગુજરાતી" },
    { code: "ta", name: "தமிழ்" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex">
      {/* Left Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 fixed h-screen">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <Link to="/user" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              {t("appName")}
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User Profile & Language Selector - Desktop */}
        <div className="p-4 border-t border-gray-200 space-y-3">
          <div className="bg-slate-50 p-3 rounded-lg flex flex-col gap-1 items-start w-full border border-slate-100">
            <span className="text-xs text-slate-500 font-medium">
              Logged in as
            </span>
            <span className="text-sm font-bold text-slate-800 truncate w-full">
              {user ? user.name : "Citizen"}
            </span>
            <button
              onClick={logout}
              className="text-xs font-semibold text-red-600 hover:text-red-700 mt-1"
            >
              Log out
            </button>
          </div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top Header - Mobile */}
        <header className="bg-white shadow-md sticky top-0 z-40 lg:hidden">
          <div className="px-4 sm:px-6">
            <div className="flex justify-between items-center h-16">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>

              {/* Logo - Mobile */}
              <Link to="/user" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  {t("appName")}
                </span>
              </Link>

              {/* Right Side Actions - Mobile */}
              <div className="flex items-center space-x-2">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="px-2 py-1 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name.split(" ")[0]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Mobile Navigation Drawer */}
            {mobileMenuOpen && (
              <nav className="py-4 border-t border-gray-200">
                {/* Mobile User Profile */}
                <div className="px-4 mb-4 pb-4 border-b border-gray-100 flex justify-between items-center">
                  <div>
                    <span className="text-xs text-slate-500 font-medium block">
                      Logged in as
                    </span>
                    <span className="text-sm font-bold text-slate-800">
                      {user ? user.name : "Citizen"}
                    </span>
                  </div>
                  <button
                    onClick={logout}
                    className="text-xs font-semibold bg-red-50 text-red-600 px-3 py-1.5 rounded-md"
                  >
                    Logout
                  </button>
                </div>
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium mb-1 ${
                        isActive
                          ? "bg-gradient-to-r from-blue-600 to-green-600 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full max-w-6xl mx-auto">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p className="text-center text-gray-600 text-sm">
              © 2026 {t("appName")} - {t("welcomeSubtitle")}
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

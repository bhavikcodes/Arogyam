import React from "react";
import { useAuth } from "../../../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import { Activity, Users, FileText, TrendingUp } from "lucide-react";

export function Home() {
  const { user } = useAuth();
  const { t } = useLanguage();

  const stats = [
    {
      label: t("activeCases"),
      value: "12",
      icon: Activity,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: t("findCamps"),
      value: "5",
      icon: Users,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: t("records"),
      value: "28",
      icon: FileText,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: t("alerts"),
      value: "3",
      icon: TrendingUp,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold">
          {t("welcomeBack")}, {user ? user.name : "Citizen"} 👋
        </h1>
        <p className="mt-2 text-blue-100 text-lg">{t("dashboardDesc")}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition"
            >
              <div
                className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center mb-3`}
              >
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          {t("quickActions")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a
            href="/user/create-case"
            className="flex items-center gap-3 p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition"
          >
            <FileText className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-blue-800">
              {t("registerCase")}
            </span>
          </a>
          <a
            href="/user/health-records"
            className="flex items-center gap-3 p-4 rounded-lg bg-green-50 hover:bg-green-100 transition"
          >
            <Activity className="w-5 h-5 text-green-600" />
            <span className="font-medium text-green-800">
              {t("viewRecords")}
            </span>
          </a>
          <a
            href="/user/nearby-camps"
            className="flex items-center gap-3 p-4 rounded-lg bg-purple-50 hover:bg-purple-100 transition"
          >
            <Users className="w-5 h-5 text-purple-600" />
            <span className="font-medium text-purple-800">
              {t("findCamps")}
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

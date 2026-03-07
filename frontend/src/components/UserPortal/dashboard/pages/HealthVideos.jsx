import React from "react";
import { Video, Play } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export function HealthVideos() {
  const { t } = useLanguage();
  const videos = [
    {
      title: "Understanding Dengue Prevention",
      duration: "5:30",
      category: "Prevention",
      thumbnail: "🦟",
    },
    {
      title: "Clean Water & Sanitation Tips",
      duration: "4:15",
      category: "Hygiene",
      thumbnail: "💧",
    },
    {
      title: "First Aid for Snake Bites",
      duration: "6:00",
      category: "Emergency",
      thumbnail: "🐍",
    },
    {
      title: "Nutrition for Pregnant Women",
      duration: "7:45",
      category: "Maternal Health",
      thumbnail: "🤰",
    },
    {
      title: "Recognizing Early Signs of Malaria",
      duration: "3:50",
      category: "Prevention",
      thumbnail: "🔬",
    },
    {
      title: "Mental Health Awareness",
      duration: "8:20",
      category: "Wellbeing",
      thumbnail: "🧠",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {t("healthVideos")}
      </h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((v, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition group cursor-pointer"
          >
            <div className="bg-gradient-to-br from-blue-100 to-green-100 h-36 flex items-center justify-center text-5xl relative">
              {v.thumbnail}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition flex items-center justify-center">
                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-lg">
                  <Play className="w-5 h-5 text-blue-600 ml-0.5" />
                </div>
              </div>
            </div>
            <div className="p-4">
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                {v.category}
              </span>
              <h3 className="font-bold text-gray-800 mt-2 text-sm">
                {v.title}
              </h3>
              <div className="flex items-center gap-1 text-xs text-gray-400 mt-2">
                <Video className="w-3 h-3" /> {v.duration}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

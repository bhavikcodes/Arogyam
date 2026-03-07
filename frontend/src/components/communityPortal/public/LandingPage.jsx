import React from "react";

export default function LandingPage() {
  return (
    <div>
      <section className="bg-blue-50 py-16 px-6 lg:py-20">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight text-slate-900">
              Empowering <span className="text-blue-600">Community Health</span>{" "}
              Workers
            </h1>
            <p className="text-lg text-slate-600">
              Arogyam provides a streamlined platform for field workers to
              register patients, track symptoms, and monitor local health trends
              in real-time.
            </p>
            <ul className="space-y-3 text-slate-700 font-medium">
              <li className="flex items-center gap-2">
                ✅ Live Location Tracking for accurate outbreak mapping
              </li>
              <li className="flex items-center gap-2">
                ✅ Comprehensive Symptom Logging
              </li>
              <li className="flex items-center gap-2">
                ✅ Secure Patient Data Management
              </li>
            </ul>
          </div>

          {/* Replaced Login portal with a large image */}
          <div className="lg:w-1/2 w-full">
            <img
              src="https://media.istockphoto.com/id/1217981399/vector/group-of-multicultural-medicine-workers.jpg?s=612x612&w=0&k=20&c=DsdydNB-J1swniRdkj6BPQ_0Yg8MKaq4bvNqGueDLuk="
              alt="Healthcare Workers in the field"
              className="rounded-2xl shadow-2xl border-8 border-white object-cover h-[450px] w-full"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

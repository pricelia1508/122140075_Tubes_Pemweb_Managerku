import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

import {
  Eye,
  CalendarCheck,
  Users,
  Flag,
  FileBarChart,
  CalendarClock,
} from "lucide-react";

const features = [
  {
    title: "Pantau Proyek Anda",
    description: "Lihat status semua proyek.",
    icon: Eye,
  },
  {
    title: "Atur Deadline & Jadwal",
    description: "Buat rencana kerja dengan waktu yang terstruktur.",
    icon: CalendarCheck,
  },
  {
    title: "Tugas Prioritas",
    description: "Tentukan prioritas tinggi, sedang, atau rendah.",
    icon: Flag,
  },
];

export default function HeroGrid() {
  return (
    <section className="relative py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          ManagerKu
        </h1>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Satu Tempat untuk Semua Proyek Anda
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Managerku membantu Anda mengelola proyek dan tugas dalam satu platform
          terpadu.
        </p>

        <Link
          to={"/login"}
          className="flex justify-center items-center w-full mt-10"
        >
          <Button>Get Started Now</Button>
        </Link>
      </div>

      {/* Grid Features with Icons */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div
              key={idx}
              className="flex flex-col items-center text-center bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <Icon className="w-14 h-14 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

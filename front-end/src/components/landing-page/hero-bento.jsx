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

const imageData = [
  {
    src: "https://picsum.photos/seed/pic1/600/400",
    title: "Pantau Proyek Anda",
    description: "Lihat status semua proyek secara real-time.",
    icon: <Eye className="w-6 h-6 text-white" />,
  },
  {
    src: "https://picsum.photos/seed/pic2/600/400",
    title: "Atur Deadline & Jadwal",
    description: "Buat rencana kerja dengan waktu yang terstruktur.",
    icon: <CalendarCheck className="w-6 h-6 text-white" />,
  },
  {
    src: "https://picsum.photos/seed/pic3/600/400",
    title: "Kolaborasi Tim Mudah",
    description: "Tambahkan anggota dan kelola peran dalam satu klik.",
    icon: <Users className="w-6 h-6 text-white" />,
  },
  {
    src: "https://picsum.photos/seed/pic4/600/400",
    title: "Tugas Prioritas",
    description: "Tentukan prioritas tinggi, sedang, atau rendah.",
    icon: <Flag className="w-6 h-6 text-white" />,
  },
  {
    src: "https://picsum.photos/seed/pic5/600/400",
    title: "Laporan Otomatis",
    description: "Dapatkan laporan progres harian dan mingguan.",
    icon: <FileBarChart className="w-6 h-6 text-white" />,
  },
  {
    src: "https://picsum.photos/seed/pic6/600/400",
    title: "Integrasi Kalender",
    description: "Sinkronisasi tugas dengan kalender Anda.",
    icon: <CalendarClock className="w-6 h-6 text-white" />,
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
          Managerku membantu Anda mengelola proyek, tugas, dan tim dalam satu
          platform terpadu.
        </p>
      </div>

      {/* Mobile Grid */}
      <div className="md:hidden grid gap-4 grid-cols-1 sm:grid-cols-2 max-w-6xl mx-auto">
        {imageData.map((item, idx) => (
          <div
            key={idx}
            className="relative overflow-hidden rounded-xl shadow-md group"
          >
            <img
              src={item.src}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 max-h-[250px]"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 text-left text-white">
              <h3 className="text-lg font-bold mb-1">{item.title}</h3>
              <p className="text-sm text-white/80">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tablet/Desktop Grid */}
      <div
        className="hidden md:grid gap-4 max-w-6xl mx-auto"
        style={{
          display: "grid",
          gridTemplateAreas: `
            "item1 item2 item3"
            "item4 item4 item3"
            "item5 item5 item6"
          `,
          gridTemplateColumns: "1fr 1fr 1fr",
          gridTemplateRows: "auto auto auto",
        }}
      >
        {imageData.map((item, idx) => {
          const gridArea = `item${idx + 1}`;
          return (
            <div
              key={idx}
              className="relative overflow-hidden rounded-xl shadow-md group"
              style={{ gridArea }}
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 max-h-[300px]"
              />
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                {item.icon}
                <span className="text-sm font-semibold text-white">
                  {item.title}
                </span>
              </div>
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 text-left text-white">
                <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                <p className="text-sm text-white/80">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <Link
        to={"/login"}
        className="flex justify-center items-center w-full mt-10"
      >
        <Button>Get Started Now</Button>
      </Link>
    </section>
  );
}

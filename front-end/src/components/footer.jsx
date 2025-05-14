import { Link } from "react-router-dom";
import {
  Mail,
  MapPin,
  Phone,
  Instagram,
  Twitter,
  Facebook,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white pt-14 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 pb-10 border-b border-white/20">
        {/* Kolom Kiri: Brand + Navigasi */}
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-white">Managerku</h3>
            <p className="mt-2 text-sm text-white/80 max-w-md">
              Managerku adalah aplikasi berbasis web untuk mengelola proyek dan
              tugas harian Anda secara terstruktur dan efisien, baik individu
              maupun tim.
            </p>
          </div>

          <div>
            <h4 className="text-md font-semibold text-white/90 mb-2">
              Navigasi
            </h4>
            <div className="flex flex-col sm:flex-row sm:space-x-6 text-sm space-y-2 sm:space-y-0">
              <Link to="/" className="hover:text-white opacity-80">
                Home
              </Link>
              <Link to="/projects" className="hover:text-white opacity-80">
                Projects
              </Link>
              <Link to="/tasks" className="hover:text-white opacity-80">
                Tasks
              </Link>
              <Link to="/team" className="hover:text-white opacity-80">
                Team
              </Link>
              <Link to="/reports" className="hover:text-white opacity-80">
                Reports
              </Link>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Kontak */}
        <div className="space-y-6">
          <div>
            <h4 className="text-md font-semibold text-white/90 mb-2">
              Hubungi Kami
            </h4>
            <ul className="text-sm text-white/80 space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5" />
                Jl. Teknokrat No.1, Lampung
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5" />
                support@managerku.id
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5" />
                +62 812 9876 5432
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bar Bawah: Sosial + Hak Cipta */}
      <div className="flex flex-col sm:flex-row justify-between max-w-7xl mx-auto items-center py-6 text-sm text-white/60 gap-4">
        <p>© {currentYear} Managerku. All rights reserved.</p>

        <div className="flex space-x-4 text-white/70 text-lg">
          <a href="#" aria-label="Instagram" className="hover:text-white">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-white">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" aria-label="Facebook" className="hover:text-white">
            <Facebook className="w-5 h-5" />
          </a>
          <a href="#" aria-label="Email" className="hover:text-white">
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

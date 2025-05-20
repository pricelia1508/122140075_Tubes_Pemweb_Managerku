import { useLocation, Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, KanbanIcon, UserIcon } from "lucide-react";
import clsx from "clsx";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth"; // pastikan ini sesuai path-mu

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Projects", path: "/dashboard/manage-projects", icon: KanbanIcon },
  { label: "Profile", path: "/dashboard/profile", icon: UserIcon },
];

export default function DashboardLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { checkSession } = useAuth();

  // 🔐 Cek session saat halaman dimuat
  useEffect(() => {
    const session = checkSession();

    if (!session.isValid) {
      navigate("/login");
    }
  }, [checkSession, navigate]);

  return (
    <div className="min-h-screen bg-muted/40 pb-16">
      {/* Main Content */}
      <main className="p-0 md:p-4">{children}</main>

      {/* Floating Bottom Navigation */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-md bg-white shadow-xl rounded-xl px-4 py-2 flex justify-around items-center border border-border">
        {navItems.map(({ label, path, icon: Icon }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={clsx(
                "flex flex-col items-center text-xs transition-colors",
                isActive
                  ? "text-primary font-semibold"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[11px]">{label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

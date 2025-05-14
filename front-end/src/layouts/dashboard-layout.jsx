import { useLocation, Link } from "react-router-dom";
import { LayoutDashboard, KanbanIcon, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  {
    label: "Projects",
    path: "/dashboard/manage-projects",
    icon: KanbanIcon,
  },
];

export default function DashboardLayout({ children }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-muted/40 pb-16">
      {" "}
      {/* bottom padding for nav */}
      {/* Main Content */}
      <main className="p-4">{children}</main>
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

        {/* Logout Button */}
        <Button
          variant="ghost"
          size="icon"
          className="text-red-600 hover:text-red-700"
          asChild
        >
          <Link to="/">
            <LogOut className="w-5 h-5" />
          </Link>
        </Button>
      </nav>
    </div>
  );
}

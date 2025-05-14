import { useState, useCallback, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Scroll event handler
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const getNavLinkClass = (href) => {
    const isActive = location.pathname === href;
    return `px-4 py-2 rounded-md transition-colors duration-300 ${
      isActive
        ? "text-blue-800 font-semibold"
        : "text-gray-600 hover:text-blue-800"
    }`;
  };

  const getLogoClass = () =>
    `text-lg flex items-center font-bold transition-colors duration-300 text-blue-800`;

  return (
    <header
      className={`fixed z-50 left-1/2 top-6 w-[95%] max-w-6xl -translate-x-1/2 rounded-xl transition-all duration-300 ${
        isScrolled || isOpen
          ? "bg-[#E7F0FA]/90 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center px-4 py-3 md:px-6">
        {/* Logo */}
        <Link to="/" className={getLogoClass()}>
          <span className="font-bold text-sm sm:text-base">Managerku</span>
        </Link>

        {/* Desktop Navigation */}
        {/* <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={getNavLinkClass(item.path)}
            >
              {item.label}
            </Link>
          ))}
        </nav> */}

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <Link to="/login">Masuk</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/dashboard">Dashboard</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
        >
          <svg
            className="h-6 w-6 text-blue-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden bg-[#E7F0FA]/90 backdrop-blur-md rounded-b-md pb-4 pt-2 mt-1">
          <ul className="flex flex-col gap-2 px-4">
            {/* {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={getNavLinkClass(item.path)}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))} */}
            <li>
              <Button
                asChild
                variant="outline"
                className="w-full justify-start text-left text-blue-800 border-blue-800 hover:bg-blue-800/5"
              >
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  Masuk
                </Link>
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

// Menu navigasi utama
const navItems = [
  { label: "Home", path: "/" },
  { label: "Projects", path: "/projects" },
  { label: "Tasks", path: "/tasks" },
  { label: "Team", path: "/team" },
  { label: "Reports", path: "/reports" },
];

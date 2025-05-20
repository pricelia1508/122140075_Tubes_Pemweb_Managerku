import { useState } from "react";
import Cookies from "js-cookie";

const API_URL = "http://localhost:6543/api/v1";

export function useAuth() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔐 Login
  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return false;
      }

      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      setLoading(false);

      window.location.href = "/dashboard";
      return true;
    } catch (err) {
      setError("An unexpected error occurred.");
      setLoading(false);
      return false;
    }
  };

  // ✍️ Register
  const register = async (username, email, password) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        setLoading(false);
        return false;
      }

      setLoading(false);
      return true;
    } catch (err) {
      setError("An unexpected error occurred.");
      setLoading(false);
      return false;
    }
  };

  // 🚪 Logout
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    Cookies.remove("auth_tkt");
    window.location.href = "/login";
  };

  // ✅ Check session via js-cookie
  const checkSession = () => {
    const authToken = Cookies.get("auth_tkt");
    const storedUser = localStorage.getItem("user");

    const isValid = !!authToken && !!storedUser;

    return {
      isValid,
      user: isValid ? JSON.parse(storedUser) : null,
    };
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    checkSession,
  };
}

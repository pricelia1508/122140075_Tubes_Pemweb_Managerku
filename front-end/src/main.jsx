import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import App from "@/App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@/pages/login/index.jsx";
import Register from "@/pages/register/index.jsx";
import Dashboard from "@/pages/dashboard";
import IndexManageProject from "@/pages/dashboard/manage-projects";
import ShowManageProject from "@/pages/dashboard/manage-projects/show";
import IndexNotFound from "@/pages/not-found";
import IndexProfile from "@/pages/dashboard/profile";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<IndexNotFound />} />

        {/* ADMIN AREAS */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Manage Projects */}
        <Route
          path="/dashboard/manage-projects"
          element={<IndexManageProject />}
        />
        <Route
          path="/dashboard/manage-projects/:projectId"
          element={<ShowManageProject />}
        />

        {/* Profile */}
        <Route path="/dashboard/profile" element={<IndexProfile />} />
      </Routes>

      <Toaster />
    </BrowserRouter>
  </StrictMode>
);

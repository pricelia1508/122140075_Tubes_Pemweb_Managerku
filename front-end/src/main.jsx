import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import App from "@/App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@/pages/login/index.jsx";
import Register from "@/pages/register/index.jsx";
import Dashboard from "@/pages/dashboard";
import ManageProjects from "./pages/dashboard/manage-projects";
import CreateProject from "./pages/dashboard/manage-projects/create";
import EditProject from "./pages/dashboard/manage-projects/edit";
import ProjectDetailWithTasks from "./pages/dashboard/manage-projects/show";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<h1>Halaman tidak ditemukan</h1>} />

        {/* ADMIN AREAS */}
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Manage Projects */}
        <Route path="/dashboard/manage-projects" element={<ManageProjects />} />
        <Route
          path="/dashboard/manage-projects/create"
          element={<CreateProject />}
        />
        <Route
          path="/dashboard/manage-projects/edit/:id"
          element={<EditProject />}
        />

        {/* show projects */}
        <Route
          path="/dashboard/manage-projects/:id"
          element={<ProjectDetailWithTasks />}
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

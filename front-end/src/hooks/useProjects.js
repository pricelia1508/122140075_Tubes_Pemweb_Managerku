// hooks/useProjects.js
import { useState, useEffect, useCallback } from "react";

const PROJECTS_URL = "http://localhost:6543/api/v1/projects";

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(PROJECTS_URL, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch projects");

      const data = await res.json();
      setProjects(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const getProjectById = (id) => projects.find((p) => p.id === id);

  const createProject = async (newProject) => {
    try {
      const now = new Date().toISOString().split("T")[0];
      const body = JSON.stringify({
        ...newProject,
        created_at: now,
        updated_at: now,
      });

      const res = await fetch(PROJECTS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body,
      });

      if (!res.ok) throw new Error("Failed to create project");
      const created = await res.json();
      setProjects((prev) => [...prev, created]);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    }
  };

  const updateProject = async (project) => {
    try {
      const updatedProject = {
        ...project,
        updated_at: new Date().toISOString().split("T")[0],
      };

      const res = await fetch(`${PROJECTS_URL}/${project.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updatedProject),
      });

      if (!res.ok) throw new Error("Failed to update project");
      const updated = await res.json();
      setProjects((prev) =>
        prev.map((p) => (p.id === updated.id ? updated : p))
      );
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    }
  };

  const deleteProject = async (id) => {
    try {
      const res = await fetch(`${PROJECTS_URL}/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to delete project");
      setProjects((prev) => prev.filter((p) => p.id !== id));
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    }
  };

  return {
    projects,
    loading,
    error,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    refetch: fetchProjects,
  };
};

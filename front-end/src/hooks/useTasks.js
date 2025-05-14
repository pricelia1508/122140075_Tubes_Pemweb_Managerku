// src/hooks/useTasks.js
import { useState, useEffect } from "react";

export function useTasks(projectId) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/data/tasks.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load tasks");
        return res.json();
      })
      .then((data) => {
        const filtered = projectId
          ? data.filter((t) => t.project_id === Number(projectId))
          : data;
        setTasks(filtered);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [projectId]);

  return { tasks, loading, error };
}

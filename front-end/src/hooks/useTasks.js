import { useState, useEffect, useCallback } from "react";

const TASKS_URL = "http://localhost:6543/api/v1/tasks";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔄 Fetch tasks
  const fetchTasks = useCallback(() => {
    setLoading(true);
    fetch(TASKS_URL, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch tasks");
        return res.json();
      })
      .then((data) => setTasks(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // 🔍 Get one task
  const getTaskById = (id) => tasks.find((task) => task.id === id);

  const getTasksByProjectId = (projectId) =>
    tasks.filter((task) => task.project_id === projectId);

  // ➕ Create
  const createTask = async (newTask) => {
    try {
      const res = await fetch(TASKS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(newTask),
      });

      if (!res.ok) throw new Error("Failed to create task");

      const created = await res.json();
      setTasks((prev) => [...prev, created]);

      return { success: true, data: created };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    }
  };

  // ✏️ Update
  const updateTask = async (task) => {
    try {
      const updatedPayload = {
        ...task,
        updated_at: new Date().toISOString().split("T")[0],
      };

      const res = await fetch(`${TASKS_URL}/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updatedPayload),
      });

      if (!res.ok) throw new Error("Failed to update task");

      const updated = await res.json();

      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));

      return { success: true, data: updated };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    }
  };

  // 🗑️ Delete
  const deleteTask = async (id) => {
    try {
      const res = await fetch(`${TASKS_URL}/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to delete task");

      setTasks((prev) => prev.filter((t) => t.id !== id));

      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    }
  };

  return {
    tasks,
    loading,
    error,
    getTaskById,
    getTasksByProjectId,
    createTask,
    updateTask,
    deleteTask,
    refetch: fetchTasks,
  };
};

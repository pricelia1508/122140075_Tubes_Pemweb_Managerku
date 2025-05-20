---
### File: hooks\useAuth.js

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://127.0.0.1:6543/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);

        Cookies.set("user", JSON.stringify(data.user), { expires: 1 });

        toast.success("Login successful!");

        navigate("/dashboard");
      } else {
        setError(data.error);
        toast.error(data.error || "Login failed.");
      }
    } catch (err) {
      setError("Login failed: " + err.message);
      toast.error("Login failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (username, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://127.0.0.1:6543/api/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Registration successful!");
      } else {
        setError(data.error);
        toast.error(data.error || "Registration failed.");
      }
    } catch (err) {
      setError("Registration failed: " + err.message);
      toast.error("Registration failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://127.0.0.1:6543/api/v1/logout", {
        method: "POST",
      });

      const data = await response.json();
      if (response.ok) {
        setUser(null);
        Cookies.remove("user");
        Cookies.remove("auth_tkt");
        navigate("/login");
        toast.success("Logout successful!");
      } else {
        setError(data.error);
        toast.error(data.error || "Logout failed.");
      }
    } catch (err) {
      setError("Logout failed: " + err.message);
      toast.error("Logout failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };
};


---

### File: hooks\useCurrentUser.js

import Cookies from "js-cookie";

export function useCurrentUser() {
const userCookie = Cookies.get("user");
const authTkt = Cookies.get("auth_tkt");

// Keduanya harus tersedia agar user dianggap terautentikasi
if (!userCookie || !authTkt) return null;

try {
return JSON.parse(userCookie);
} catch (e) {
console.error("Invalid user cookie format");
return null;
}
}

---

### File: hooks\useProjects.js

// src/hooks/useProjects.js
import { useState, useEffect } from "react";

const PROJECTS_URL = "http://127.0.0.1:6543/api/v1/projects"; // Replace with your backend route

export const useProjects = () => {
const [projects, setProjects] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
fetch(PROJECTS_URL)
.then((res) => {
if (!res.ok) throw new Error("Failed to fetch projects");
return res.json();
})
.then((data) => {
setProjects(data);
setLoading(false);
})
.catch((err) => {
setError(err.message);
setLoading(false);
});
}, []);

const getProjectById = (id) => projects.find((project) => project.id === id);

const createProject = (newProject) => {
const projectWithDates = {
...newProject,
created_at: new Date().toISOString().split("T")[0],
updated_at: new Date().toISOString().split("T")[0],
};
fetch(PROJECTS_URL, {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify(projectWithDates),
})
.then((res) => res.json())
.then((data) => {
setProjects((prevProjects) => [...prevProjects, data]);
})
.catch((err) => {
setError(err.message);
});
return projectWithDates;
};

const updateProject = (updatedProject) => {
const updatedList = projects.map((p) =>
p.id === updatedProject.id
? {
...updatedProject,
updated_at: new Date().toISOString().split("T")[0],
}
: p
);
setProjects(updatedList);

    fetch(`${PROJECTS_URL}/${updatedProject.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProject),
    })
      .then((res) => res.json())
      .catch((err) => {
        setError(err.message);
      });

    return updatedProject;

};

const deleteProject = (id) => {
const filtered = projects.filter((p) => p.id !== id);
setProjects(filtered);

    fetch(`${PROJECTS_URL}/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        console.log(`Project ${id} deleted`);
      })
      .catch((err) => {
        setError(err.message);
      });

};

return {
projects,
loading,
error,
getProjectById,
createProject,
updateProject,
deleteProject,
};
};

---

### File: hooks\useTasks.js

// src/hooks/useTasks.js
import { useState, useEffect } from "react";

const TASKS_URL = "http://127.0.0.1:6543/api/v1/tasks";

export const useTasks = () => {
const [tasks, setTasks] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
fetch(TASKS_URL)
.then((res) => {
if (!res.ok) throw new Error("Failed to fetch tasks");
return res.json();
})
.then((data) => {
setTasks(data);
setLoading(false);
})
.catch((err) => {
setError(err.message);
setLoading(false);
});
}, []);

const getTaskById = (id) => tasks.find((task) => task.id === id);

const getTasksByProjectId = (projectId) =>
tasks.filter((task) => task.project_id === projectId);

const createTask = (newTask) => {
const taskWithId = {
...newTask,
id: crypto.randomUUID(),
};
setTasks([...tasks, taskWithId]);
return taskWithId;
};

const updateTask = (updatedTask) => {
const updatedList = tasks.map((t) =>
t.id === updatedTask.id ? updatedTask : t
);
setTasks(updatedList);
return updatedTask;
};

const deleteTask = (id) => {
const filtered = tasks.filter((t) => t.id !== id);
setTasks(filtered);
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
};
};

---

### File: hooks\useUsers.js

// src/hooks/useUsers.js
import { useState, useEffect } from "react";

const USERS_URL = "/mock_data/users.json";

export const useUsers = () => {
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
fetch(USERS_URL)
.then((res) => {
if (!res.ok) throw new Error("Failed to fetch users");
return res.json();
})
.then((data) => {
setUsers(data);
setLoading(false);
})
.catch((err) => {
setError(err.message);
setLoading(false);
});
}, []);

const getUserById = (id) => users.find((user) => user.id === id);

return { users, loading, error, getUserById };
};

---

### File: lib\utils.js

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
return twMerge(clsx(inputs));
}

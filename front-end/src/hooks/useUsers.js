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

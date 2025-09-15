import { useState, useEffect } from "react";
import axios from "axios";
import { SAMPLE_TASKS } from "../data/tasks";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchTasks() {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/api/tasks`);
      setTasks(res.data);
    } catch (err) {
      // fallback to sample data if backend unavailable
      console.warn("Could not fetch backend tasks, using sample data.", err?.message);
      setTasks(SAMPLE_TASKS);
    } finally {
      setLoading(false);
    }
  }

  async function updateTaskStatus(id, status) {
    try {
      const res = await axios.put(`${API}/api/tasks/${id}`, { status });
      // optimistic update
      setTasks((prev) => prev.map(t => (t._id === id ? res.data : t)));
      return res.data;
    } catch (err) {
      console.error("Update failed", err);
      // update local copy
      setTasks(prev => prev.map(t => t._id === id ? {...t, status} : t));
      return null;
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, loading, fetchTasks, updateTaskStatus };
}

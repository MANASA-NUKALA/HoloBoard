import React, { useState } from "react";
import PlanetScene from "./components/PlanetScene";
import Sidebar from "./components/Sidebar";
import TaskList from "./components/TaskList";
import useTasks from "./hooks/useTasks";

export default function App() {
  const { tasks, loading, updateTaskStatus } = useTasks();
  const [selectedId, setSelectedId] = useState(null);

  const selectedTask = tasks.find(t => t._id === selectedId) || null;

  function handleSelect(id) {
    setSelectedId(id);
  }

  async function handleUpdateStatus(id, status) {
    await updateTaskStatus(id, status);
    // local update is handled in the hook
  }

  return (
    <div className="min-h-screen flex">
      <div className="w-3/4 h-screen">
        <PlanetScene tasks={tasks} onSelect={handleSelect} />
      </div>

      <div className="w-1/4 h-screen flex flex-col">
        <Sidebar task={selectedTask} onUpdateStatus={handleUpdateStatus} />
        <div className="flex-1 overflow-auto">
          {loading ? <div className="p-4">Loading...</div> : <TaskList tasks={tasks} onSelect={handleSelect} />}
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { motion } from "framer-motion";

const statusOptions = ["Pending", "In Progress", "Done"];

export default function Sidebar({ task, onUpdateStatus }) {
  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      className="w-80 bg-gradient-to-br from-slate-900/80 to-slate-800/60 p-6 rounded-l-2xl shadow-xl"
    >
      {!task ? (
        <div className="text-center text-slate-300">
          <h2 className="text-xl font-semibold">HoloBoard</h2>
          <p className="mt-4 text-sm">Click a planet to view details</p>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold">{task.title}</h2>
          <p className="text-sm text-slate-300 mt-2">{task.description}</p>

          <div className="mt-4">
            <div className="text-xs text-slate-400">Deadline</div>
            <div className="font-medium">{task.deadline}</div>
          </div>

          <div className="mt-4">
            <div className="text-xs text-slate-400">Status</div>
            <div className="flex items-center gap-2 mt-2">
              {statusOptions.map((s) => (
                <button
                  key={s}
                  onClick={() => onUpdateStatus(task._id, s)}
                  className={`px-3 py-1 rounded-full text-xs ${task.status === s ? "bg-white text-slate-900" : "bg-slate-700/40 text-slate-200"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="text-xs text-slate-400">Priority</div>
            <div className="font-medium">{task.priority || "Medium"}</div>
          </div>
        </>
      )}
    </motion.div>
  );
}

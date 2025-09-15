import React from "react";

export default function TaskList({ tasks = [], onSelect }) {
  return (
    <div className="p-4 space-y-3">
      {tasks.map(t => (
        <div key={t._id} className="p-3 bg-slate-800/30 rounded-md cursor-pointer" onClick={() => onSelect(t._id)}>
          <div className="flex justify-between">
            <div className="font-medium">{t.title}</div>
            <div className="text-xs text-slate-400">{t.status}</div>
          </div>
          <div className="text-sm text-slate-400">{t.deadline}</div>
        </div>
      ))}
    </div>
  );
}

import React from "react";
import { Trash2 } from "lucide-react";

export default function TaskList({
  tasks,
  onRemove,
}) {
  return (
    <div className="rmc-card rmc-task-list">
      {tasks.map((task) => (
        <div
          className="rmc-task"
          key={task.id}
        >
          <div
            className={`rmc-task-period ${task.period}`}
          >
            {task.period}
          </div>

          <div className="rmc-task-time">
            {task.time}
          </div>

          <div className="rmc-task-label">
            {task.label}
          </div>

          <button
            className="rmc-btn rmc-delete-btn"
            onClick={() => onRemove(task.id)}
            aria-label={`Remove ${task.label}`}
          >
            <Trash2
              size={15}
              color="#B8402C"
            />
          </button>
        </div>
      ))}

      {tasks.length === 0 && (
        <div className="rmc-empty">
          No tasks yet — add one below.
        </div>
      )}
    </div>
  );
}

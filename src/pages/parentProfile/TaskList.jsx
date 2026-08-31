
import React from "react";
import {
  Trash2,
  Pencil,
} from "lucide-react";
import Button from "../../components/Button";

export default function TaskList({
  tasks,
  onRemove,
  onEdit,
}) {
  const handleEdit = (task) => {
    const newLabel = window.prompt(
      "Update task name:",
      task.label
    );

    if (
      newLabel === null ||
      !newLabel.trim()
    ) {
      return;
    }

    const newTime = window.prompt(
      "Update task time:",
      task.time
    );

    onEdit(task.id, {
      label: newLabel.trim(),
      time:
        newTime?.trim() || task.time,
    });
  };

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

          <Button
           variant="primary"
           className="rmc-icon-btn"
           onClick={() => handleEdit(task)}
           aria-label={`Edit ${task.label}`}
          >
          <Pencil size={15} />
          </Button>

          <Button
           variant="danger"
           className="rmc-icon-btn"
           onClick={() => onRemove(task.id)}
           aria-label={`Remove ${task.label}`}
          >
          <Trash2 size={15}  />
         </Button>
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


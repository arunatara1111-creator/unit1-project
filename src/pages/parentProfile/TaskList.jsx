import React, { useState } from "react";
import {
  Trash2,
  Pencil,
} from "lucide-react";
import Button from "../../components/Button";
import EditTaskModal from "./EditTaskModal";

export default function TaskList({
  tasks,
  onRemove,
  onEdit,
}) {
  const [editingTask, setEditingTask] = useState(null);

  const handleSave = (updates) => {
    onEdit(editingTask.id, updates);
    setEditingTask(null);
  };

  return (
    <div className="rmc-card rmc-task-list">

      {tasks.length > 0 && (
        <table className="rmc-task-table">
          <thead>
            <tr>
              <th scope="col">Period</th>
              <th scope="col">Time</th>
              <th scope="col">Task</th>
              <th scope="col">Actions</th>
              
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>
                  <span
                    className={`rmc-task-period ${task.period}`}
                  >
                    {task.period}
                  </span>
                </td>

                <td className="rmc-task-time">
                  {task.time}
                </td>

                <td className="rmc-task-label">
                  {task.label}
                </td>

                <td className="rmc-task-actions">
                  <Button
                   variant="primary"
                   className="rmc-icon-btn"
                   onClick={() => setEditingTask(task)}
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {tasks.length === 0 && (
        <div className="rmc-empty">
          No tasks yet — add one below.
        </div>
      )}

      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onSave={handleSave}
          onClose={() => setEditingTask(null)}
        />
      )}
    </div>
  );
}
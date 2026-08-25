import React from "react";
import { Plus } from "lucide-react";

export default function AddTaskForm({
  newPeriod,
  setNewPeriod,
  newTime,
  setNewTime,
  newLabel,
  setNewLabel,
  onAdd,
}) {
  return (
    <div className="rmc-card rmc-add-task">
      <div className="rmc-add-row">
        <select
          className="rmc-select"
          value={newPeriod}
          onChange={(e) =>
            setNewPeriod(e.target.value)
          }
        >
          <option value="morning">
            Morning
          </option>

          <option value="evening">
            Evening
          </option>
        </select>

        <input
          className="rmc-input rmc-time-input"
          value={newTime}
          onChange={(e) =>
            setNewTime(e.target.value)
          }
          placeholder="7:00"
        />

        <input
          className="rmc-input rmc-label-input"
          value={newLabel}
          onChange={(e) =>
            setNewLabel(e.target.value)
          }
          placeholder="New task name"
        />
      </div>

      <button
        className="rmc-btn rmc-add-btn"
        onClick={onAdd}
      >
        <Plus size={15} />
        Add task
      </button>
    </div>
  );
}

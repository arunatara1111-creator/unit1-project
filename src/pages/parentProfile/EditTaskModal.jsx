import React, { useEffect, useState } from "react";
import Button from "../../components/Button";

export default function EditTaskModal({
  task,
  onSave,
  onClose,
}) {
  const [label, setLabel] = useState(task.label);
  const [time, setTime] = useState(task.time);
  const [error, setError] = useState("");

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!label.trim()) {
      setError("Task name can't be empty.");
      return;
    }

    onSave({
      label: label.trim(),
      time: time || task.time,
    });
  };

  return (
    <div
      className="rmc-modal-overlay"
      onClick={onClose}
    >
      <div
        className="rmc-modal rmc-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-task-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div
          id="edit-task-title"
          className="rmc-h1 rmc-modal-title"
        >
          Edit task
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="rmc-field">
            <label htmlFor="edit-task-name">Task name</label>

            <input
              id="edit-task-name"
              className="rmc-input"
              type="text"
              value={label}
              onChange={(event) => {
                setLabel(event.target.value);
                if (error) setError("");
              }}
              maxLength={60}
              autoFocus
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "edit-task-error" : undefined}
            />

            {error && (
              <span id="edit-task-error" className="form-error">
                {error}
              </span>
            )}
          </div>

          <div className="rmc-field">
            <label htmlFor="edit-task-time">Time</label>

            <input
              id="edit-task-time"
              className="rmc-input rmc-time-input"
              type="time"
              value={time}
              onChange={(event) => setTime(event.target.value)}
            />
          </div>

          <div className="rmc-modal-actions">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button type="submit" variant="primary">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
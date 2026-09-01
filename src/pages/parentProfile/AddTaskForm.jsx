import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "../../components/Button";

export default function AddTaskForm({
  newPeriod,
  setNewPeriod,
  newTime,
  setNewTime,
  newLabel,
  setNewLabel,
  onAdd,
}) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const nextErrors = {};

    if (!newPeriod) {
      nextErrors.period = "Please choose a routine period.";
    }
    
    if (!newTime) {
      nextErrors.time = "Please choose a time.";
    }

    if (!newLabel.trim()) {
      nextErrors.label = "Please enter a task name.";
    } else if (newLabel.trim().length < 2) {
      nextErrors.label = "Task name must be at least 2 characters.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) return;

    onAdd();
    setErrors({});
  };

  return (
    <form
      className="rmc-card rmc-add-task"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="rmc-add-row">
        <div className="rmc-field">
          <label htmlFor="task-period">Period</label>

          <select
            id="task-period"
            className="rmc-select"
            value={newPeriod}
            onChange={(event) => {
              setNewPeriod(event.target.value);

              if (errors.period) {
                setErrors((current) => ({
                  ...current,
                  period: "",
                }));
              }
            }}
            aria-invalid={Boolean(errors.period)}
            aria-describedby={
              errors.period ? "period-error" : undefined
            }
            required
          >
            <option value="morning">Morning</option>
            <option value="evening">Evening</option>
          </select>

          {errors.period && (
            <span id="period-error" className="form-error">
              {errors.period}
            </span>
          )}
        </div>

        <div className="rmc-field">
          <label htmlFor="task-time">Time</label>

          <input
            id="task-time"
            className="rmc-input rmc-time-input"
            type="time"
            value={newTime}
            onChange={(event) => {
              setNewTime(event.target.value);

              if (errors.time) {
                setErrors((current) => ({
                  ...current,
                  time: "",
                }));
              }
            }}
            aria-invalid={Boolean(errors.time)}
            aria-describedby={
              errors.time ? "time-error" : undefined
            }
            required
          />

          {errors.time && (
            <span id="time-error" className="form-error">
              {errors.time}
            </span>
          )}
        </div>

        <div className="rmc-field">
          <label htmlFor="task-name">Task name</label>

          <input
            id="task-name"
            className="rmc-input rmc-label-input"
            type="text"
            value={newLabel}
            onChange={(event) => {
              setNewLabel(event.target.value);

              if (errors.label) {
                setErrors((current) => ({
                  ...current,
                  label: "",
                }));
              }
            }}
            placeholder="New task name"
            minLength={2}
            maxLength={60}
            aria-invalid={Boolean(errors.label)}
            aria-describedby={
              errors.label ? "label-error" : undefined
            }
            required
          />

          {errors.label && (
            <span id="label-error" className="form-error">
              {errors.label}
            </span>
          )}
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        className="rmc-add-btn"
      >
        <Plus size={15} />
        Add task
      </Button>
    </form>
  );
}

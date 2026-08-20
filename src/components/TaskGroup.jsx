import React from "react";
import { Check } from "lucide-react";
import { TOKENS } from "./constants/tokens";

export default function TaskGroup({
  title,
  icon: Icon,
  tasks,
  log,
  toggle,
  color,
}) {
  if (!tasks.length) {
    return null;
  }

  return (
    <div className="task-group">

      {/* Group heading */}
      <div className="task-group__header">
        <Icon
          size={16}
          color={color}
        />

        <div
          className="task-group__title"
          style={{ color }}
        >
          {title}
        </div>
      </div>

      {/* Tasks */}
      <div className="task-group__list">
        {tasks.map((task) => {
          const checked =
            !!log[task.id];

          return (
            <button
              key={task.id}
              className="rmc-btn rmc-card task-button"
              onClick={() =>
                toggle(task.id)
              }
              style={{
                border: `1.5px solid ${
                  checked
                    ? color
                    : TOKENS.slateBorder
                }`,

                background: checked
                  ? `${color}14`
                  : "white",
              }}
            >
              {/* Checkbox */}
              <div
                className="task-checkbox"
                style={{
                  border: `2px solid ${
                    checked
                      ? color
                      : TOKENS.slateBorder
                  }`,

                  background: checked
                    ? color
                    : "white",
                }}
              >
                {checked && (
                  <Check
                    size={16}
                    color="white"
                    strokeWidth={3}
                  />
                )}
              </div>

              {/* Time */}
              <div className="task-time">
                {task.time}
              </div>

              {/* Label */}
              <div
                className="task-label"
                style={{
                  color: checked
                    ? TOKENS.inkSoft
                    : TOKENS.ink,

                  textDecoration: checked
                    ? "line-through"
                    : "none",
                }}
              >
                {task.label}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
import React from "react";
import { Check } from "lucide-react";


export default function TaskGroup({
  title,
  icon,
  tasks,
  log,
  onToggle,
  
}) {
  return (
    <section className="task-group">

    <div className="task-group-heading">

      {icon}

      <h2>
        {title}
      </h2>

    </div>


    <div className="task-group-list">

      {tasks.map((task) => {

        const completed =
          Boolean(log[task.id]);


        return (

          <button
            key={task.id}
            className={`child-task ${
              completed
                ? "completed"
                : ""
            }`}
            onClick={() =>
              onToggle(task.id)
            }
          >

            <span className="task-check">

              {completed ? (
                <Check size={18} />
              ) : (
                ""
              )}

            </span>


            <span className="task-time">
              {task.time}
            </span>


            <span className="task-label">
              {task.label}
            </span>


            {completed && (
              <span className="task-star">
                ⭐
              </span>
            )}

          </button>

        );

      })}

    </div>

  </section>
);
}



    
    

      

      

import React, { useEffect, useMemo, useState } from "react";
import { Sun, Moon, Star, Rocket } from "lucide-react";
import confetti from "canvas-confetti";

import Shell from "./Shell";
import TopBar from "../../components/TopBar";
import TaskGroup from "./TaskGroup";
import ProgressCard from "./ProgressCard";

import { DEFAULT_TASKS } from "../data/tasks";

import {
  todayStr,
  storageGet,
  storageSet,
} from "../utils/storage";

import { TOKENS } from "../constants/tokens";
import Button from "../../components/Button";

export default function ChildView({ onBack }) {

  // DATE
  
  const [date, setDate] = useState(todayStr());

  // TASKS

  const [tasks, setTasks] = useState(DEFAULT_TASKS);

  // COMPLETED TASK LOG
  
  const [log, setLog] = useState({});

  // LOADING
  
  const [loading, setLoading] = useState(true);

  // LAUNCH ANIMATION / ALL TASKS COMPLETE
  
  const [launched, setLaunched] = useState(false);

  // LOAD TASKS AND TODAY'S COMPLETION LOG
  
  useEffect(() => {

    async function loadData() {

      try {

        // Get the shared routine created by Parent
        const taskValue =
          await storageGet("routine-tasks");


        let loadedTasks;


        if (taskValue) {

          loadedTasks =
            JSON.parse(taskValue);

        } else {

          // First time the app runs
          loadedTasks =
            DEFAULT_TASKS;

          await storageSet(
            "routine-tasks",
            DEFAULT_TASKS
          );
        }


        setTasks(loadedTasks);


        // Get today's completed tasks
        const logValue =
          await storageGet(
            `log:${date}`
          );


        const loadedLog =
          logValue
            ? JSON.parse(logValue)
            : {};


        setLog(loadedLog);


      } catch (error) {

        console.error(
          "Child data loading error:",
          error
        );

      } finally {

        setLoading(false);

      }

    }


    loadData();

  }, [date]);

  // LISTEN FOR PARENT TASK CHANGES
  
  useEffect(() => {

    const handleTaskChange = (event) => {

      if (
        event.detail?.key !==
        "routine-tasks"
      ) {
        return;
      }

      const value =
        event.detail.value;


      if (!value) {
        return;
      }


      try {

        const updatedTasks =
          JSON.parse(value);


        setTasks(updatedTasks);


        /*
         * If the parent removes a task,
         * remove its completion record too.
         */
        setLog((currentLog) => {

          const validTaskIds =
            new Set(
              updatedTasks.map(
                (task) => task.id
              )
            );


          const cleanedLog = {};


          Object.keys(currentLog)
            .forEach((taskId) => {

              if (
                validTaskIds.has(taskId)
              ) {

                cleanedLog[taskId] =
                  currentLog[taskId];

              }

            });


          return cleanedLog;

        });


      } catch (error) {

        console.error(
          "Task update error:",
          error
        );

      }

    };


    window.addEventListener(
      "brightsteps-storage",
      handleTaskChange
    );


    return () => {

      window.removeEventListener(
        "brightsteps-storage",
        handleTaskChange
      );

    };

  }, []);

  // COMPLETED COUNT
  
  const completedCount =
    tasks.filter(
      (task) => log[task.id]
    ).length;


  const totalTasks =
    tasks.length;


  const progress =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedCount /
            totalTasks) *
            100
        );

  // GROUP TASKS BY PERIOD
  
  const morningTasks = useMemo(
    () =>
      tasks.filter(
        (task) =>
          task.period === "morning"
      ),
    [tasks]
  );

  const afternoonTasks = useMemo(
    () =>
      tasks.filter(
        (task) =>
          task.period === "afternoon"
      ),
    [tasks]
  );

  const eveningTasks = useMemo(
    () =>
      tasks.filter(
        (task) =>
          task.period === "evening"
      ),
    [tasks]
  );

  // COMPLETE / UNCOMPLETE TASK
 
  const toggleTask = async (taskId) => {

    const updatedLog = {
      ...log,
      [taskId]: !log[taskId],
    };

    // If task is being unchecked,
    // remove false values from the log.
    if (!updatedLog[taskId]) {
      delete updatedLog[taskId];
    }

    setLog(updatedLog);

    // Save today's completion record
    await storageSet(
      `log:${date}`,
      updatedLog
    );


    // Calculate new completion state
    const newCompletedCount =
      tasks.filter(
        (task) =>
          updatedLog[task.id]
      ).length;


    // All tasks completed
    if (
      tasks.length > 0 &&
      newCompletedCount === tasks.length
    ) {
      setLaunched(true);
    
      // 🎉 Blast animation
      confetti({
        particleCount: 150,
        spread: 100,
        startVelocity: 45,
        origin: {
          x: 0.5,
          y: 0.6,
        },
      });
    
      // 🚀 Second blast
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 140,
          startVelocity: 35,
          origin: {
            x: 0.2,
            y: 0.7,
          },
        });
    
        confetti({
          particleCount: 100,
          spread: 140,
          startVelocity: 35,
          origin: {
            x: 0.8,
            y: 0.7,
          },
        });
      }, 300);
    
    } else {
      setLaunched(false);
    }
  };
  // DATE CHANGE
  

  const changeDate = (amount) => {

    const current =
      new Date(`${date}T12:00:00`);

    current.setDate(
      current.getDate() + amount
    );


    const nextDate =
      current
        .toISOString()
        .slice(0, 10);


    setDate(nextDate);

    setLaunched(false);

  };

   // LOADING SCREEN
  
  if (loading) {

    return (
      <Shell>

        <div
          className="child-loading"
          style={{
            padding: "60px 20px",
            textAlign: "center",
          }}
        >
          <Rocket
            size={40}
            color={TOKENS.sky}
          />

          <h2>
            Loading your routine...
          </h2>

          <p>
            Getting your Bright Steps ready!
          </p>

        </div>

      </Shell>
    );

  }

  // MAIN CHILD VIEW
  
  return (

    <Shell>

      {/* TOP BAR */}

      <TopBar
        title="My Bright Steps"
        accent={TOKENS.skyDeep}
      />

      {/* CHILD GREETING */}
      
      <section className="child-greeting">

        <div>

          <h2>
            Hi, Superstar! ⭐
          </h2>

          <p>
             Let's complete your steps for today.
          </p>

        </div>

        <div className="child-avatar">
          🌟
        </div>

      </section>

      {/* DATE NAVIGATION */}
      
      <div
        className="date-navigation"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 20,
        }}
      >
    <Button
     variant="secondary"
     onClick={() => changeDate(-1)}
    >
    ← Previous
    </Button>
 


        <strong>
          {date === todayStr()
            ? "Today"
            : date}
        </strong>


        <Button
          variant="primary"
          onClick={() =>
            changeDate(1)
          }
        >
          Next →
        </Button>

      </div>

      {/* PROGRESS */}
      
      <ProgressCard
        done={completedCount}
        total={totalTasks}
        launched={launched}
      />


      {/* -------------------------------------------- */}
      {/* ALL TASKS COMPLETE */}
      {/* -------------------------------------------- */}

      {launched && (

        <div
          className="completion-message"
          style={{
            textAlign: "center",
            padding: "20px",
            margin: "20px 0",
            borderRadius: 16,
            background: TOKENS.cream,
          }}
        >

          <Rocket
            size={38}
            color={TOKENS.skyDeep}
          />

          <h2>
            Liftoff! 🚀
          </h2>

          <p>
            You completed every task
            today!
          </p>

          <div
            style={{
              fontSize: 28,
              marginTop: 8,
            }}
          >
            ⭐ ⭐ ⭐
          </div>

        </div>

      )}

      {/* MORNING */}
      
     {morningTasks.length > 0 && (

        <TaskGroup
          title="Morning"
          icon={
            <Sun
              size={20}
            />
          }
          tasks={morningTasks}
          log={log}
          onToggle={toggleTask}
        />

      )}

      {/* AFTERNOON */}
      
      {afternoonTasks.length > 0 && (

        <TaskGroup
          title="Afternoon"
          icon={
            <Star
              size={20}
            />
          }
          tasks={afternoonTasks}
          log={log}
          onToggle={toggleTask}
        />

      )}

      {/* EVENING */}
      
      {eveningTasks.length > 0 && (

        <TaskGroup
          title="Evening"
          icon={
            <Moon
              size={20}
            />
          }
          tasks={eveningTasks}
          log={log}
          onToggle={toggleTask}
        />

      )}

      {/* NO TASKS */}
      
      {tasks.length === 0 && (

        <div
          className="empty-tasks"
          style={{
            textAlign: "center",
            padding: 40,
          }}
        >

          <div
            style={{
              fontSize: 50,
            }}
          >
            🌱
          </div>

          <h2>
            No tasks yet
          </h2>

          <p>
            Ask your parent to add
            some Bright Steps.
          </p>

        </div>

      )}

      {/* ENCOURAGEMENT */}
      
      {tasks.length > 0 &&
        !launched && (

          <div
            className="encouragement"
            style={{
              textAlign: "center",
              marginTop: 24,
              padding: 16,
            }}
          >

            {progress === 0 && (
              <>
                <div
                  style={{
                    fontSize: 28,
                  }}
                >
                  🌈
                </div>

                <p>
                  Ready to get started?
                  You've got this!
                </p>
              </>
            )}


            {progress > 0 &&
              progress < 50 && (
                <>
                  <div
                    style={{
                      fontSize: 28,
                    }}
                  >
                    💪
                  </div>

                  <p>
                    Great start!
                    Keep going!
                  </p>
                </>
              )}


            {progress >= 50 &&
              progress < 100 && (
                <>
                  <div
                    style={{
                      fontSize: 28,
                    }}
                  >
                    ⭐
                  </div>

                  <p>
                    You're more than
                    halfway there!
                  </p>
                </>
              )}

          </div>

        )}

    </Shell>

  );

}


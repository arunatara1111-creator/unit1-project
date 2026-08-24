import React, { useEffect,useState,useRef } from "react";
import confetti from "canvas-confetti";
import { Sun,Moon } from "lucide-react";
import Shell from "./Shell";  
import TopBar from "./TopBar";
import TaskGroup from "./TaskGroup";
import ProgressCard from "./ProgressCard";
import { TOKENS } from "./constants/tokens";
import { DEFAULT_TASKS } from "./data/tasks";  
import { todayStr,storageGet,storageSet } from "./utils/storage";
  
  export default function ChildView({
    onBack,
  }) {
    const [tasks, setTasks] =
      useState(DEFAULT_TASKS);
  
    const [log, setLog] =
      useState({});
  
    const [loading, setLoading] =
      useState(true);
      const blastedRef = useRef(false);
  
    const date = todayStr();
  
    useEffect(() => {
      async function loadData() {
        const taskVal =
          await storageGet(
            "routine-tasks"
          );
  
        const loadedTasks = taskVal
          ? JSON.parse(taskVal)
          : DEFAULT_TASKS;
  
        if (!taskVal) {
          await storageSet(
            "routine-tasks",
            DEFAULT_TASKS
          );
        }
  
        setTasks(loadedTasks);
  
        const logVal =
          await storageGet(
            `log:${date}`
          );
  
        setLog(
          logVal
            ? JSON.parse(logVal)
            : {}
        );
  
        setLoading(false);
      }
  
      loadData();
    }, [date]);
  
    async function toggle(id) {
      const next = {
        ...log,
        [id]: !log[id],
      };
  
      setLog(next);
  
      await storageSet(
        `log:${date}`,
        next
      );
    }
  
    const done = tasks.filter(
      (task) => log[task.id]
    ).length;
  
    const pct = tasks.length
      ? Math.round(
          (done / tasks.length) * 100
        )
      : 0;
  
    const launched =
      pct === 100 &&
      tasks.length > 0;
      useEffect(() => {
        if (launched && !blastedRef.current) {
          blastedRef.current = true;
      
          confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 }
          });
        }
      
        if (!launched) {
          blastedRef.current = false;
        }
      }, [launched]);
  
    const morning =
      tasks.filter(
        (task) =>
          task.period === "morning"
      );
  
    const evening =
      tasks.filter(
        (task) =>
          task.period === "evening"
      );
  
    if (loading) {
      return (
        <Shell>
          <div className="loading-state">
            Loading launch pad...
          </div>
        </Shell>
      );
    }
  
    return (
      <Shell>
  
        <TopBar
          title="Launch sequence"
          onBack={onBack}
          accent={TOKENS.coral}
        />
  
        <ProgressCard
          done={done}
          total={tasks.length}
          pct={pct}
          launched={launched}
        />
  
        <TaskGroup
          title="Morning"
          icon={Sun}
          tasks={morning}
          log={log}
          toggle={toggle}
          color={TOKENS.sky}
        />
  
        <TaskGroup
          title="Evening"
          icon={Moon}
          tasks={evening}
          log={log}
          toggle={toggle}
          color={TOKENS.mint}
        />
  
        {tasks.length === 0 && (
          <div className="empty-state">
            No tasks yet — ask a parent
            to add some.
          </div>
        )}
  
      </Shell>
    );
  }
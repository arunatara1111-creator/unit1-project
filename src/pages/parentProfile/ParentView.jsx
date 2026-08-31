
import React, {
  useState,
  useEffect,
  useCallback,
} from "react";

import Shell from "./Shell";
import TopBar from "../../components/TopBar";
import StatsCards from "./StatsCards";
import CompletionChart from "./CompletionChart";
import TaskList from "./TaskList";
import AddTaskForm from "./AddTaskForm";

import { DEFAULT_TASKS } from "../data/tasks";

import {
  todayStr,
  storageGet,
  storageSet,
  niceDay,
} from "../utils/storage";

import { TOKENS } from "../constants/tokens";

export default function ParentView({ onBack }) {
  const [tasks, setTasks] = useState(DEFAULT_TASKS);
  const [log, setLog] = useState({});
  const [week, setWeek] = useState([]);

  const [newLabel, setNewLabel] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newPeriod, setNewPeriod] = useState("morning");

  const [loading, setLoading] = useState(true);

  const date = todayStr();

  // --------------------------------
  // LOAD WEEKLY PROGRESS
  // --------------------------------

  const loadWeek = useCallback(async (currentTasks) => {
    const days = [];

    for (let i = 6; i >= 0; i--) {
      const d = todayStr(-i);

      const val = await storageGet(`log:${d}`);

      const parsed = val
        ? JSON.parse(val)
        : {};

      const done = Object.values(parsed)
        .filter(Boolean)
        .length;

      days.push({
        date: d,
        label: niceDay(d),
        done,
        total: currentTasks.length || 1,
      });
    }

    setWeek(days);
  }, []);

  // --------------------------------
  // LOAD TASKS
  // --------------------------------

  const loadTasks = useCallback(async () => {
    const taskVal =
      await storageGet("routine-tasks");

    if (taskVal) {
      const loadedTasks = JSON.parse(taskVal);

      setTasks(loadedTasks);

      await loadWeek(loadedTasks);
    } else {
      await storageSet(
        "routine-tasks",
        DEFAULT_TASKS
      );

      setTasks(DEFAULT_TASKS);

      await loadWeek(DEFAULT_TASKS);
    }
  }, [loadWeek]);

  // --------------------------------
  // INITIAL LOAD
  // --------------------------------

  useEffect(() => {
    async function loadData() {
      await loadTasks();

      const logVal =
        await storageGet(`log:${date}`);

      setLog(
        logVal
          ? JSON.parse(logVal)
          : {}
      );

      setLoading(false);
    }

    loadData();
  }, [date, loadTasks]);

  // --------------------------------
  // LISTEN FOR TASK CHANGES
  // --------------------------------

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (
        event.detail?.key ===
        "routine-tasks"
      ) {
        loadTasks();
      }
    };

    window.addEventListener(
      "brightsteps-storage",
      handleStorageChange
    );

    return () => {
      window.removeEventListener(
        "brightsteps-storage",
        handleStorageChange
      );
    };
  }, [loadTasks]);

  // --------------------------------
  // ADD TASK
  // --------------------------------

  const addTask = async () => {
    if (!newLabel.trim()) return;

    const task = {
      id: `t${Date.now()}`,
      period: newPeriod,
      time: newTime || "--:--",
      label: newLabel.trim(),
    };

    const next = [
      ...tasks,
      task,
    ];

    setTasks(next);

    await storageSet(
      "routine-tasks",
      next
    );

    await loadWeek(next);

    setNewLabel("");
    setNewTime("");
  };

  // --------------------------------
  // EDIT TASK
  // --------------------------------

  const editTask = async (
    id,
    updates
  ) => {
    const next = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            ...updates,
          }
        : task
    );

    setTasks(next);

    // THIS is what connects
    // Parent → Child
    await storageSet(
      "routine-tasks",
      next
    );

    await loadWeek(next);
  };

  // --------------------------------
  // DELETE TASK
  // --------------------------------

  const removeTask = async (id) => {
    const next = tasks.filter(
      (task) => task.id !== id
    );

    setTasks(next);

    await storageSet(
      "routine-tasks",
      next
    );

    await loadWeek(next);
  };

  const done = tasks.filter(
    (task) => log[task.id]
  ).length;

  const weekAvgPct = week.length
    ? Math.round(
        (
          week.reduce(
            (sum, day) =>
              sum + day.done / day.total,
            0
          ) / week.length
        ) * 100
      )
    : 0;

  if (loading) {
    return (
      <Shell>
        <div
          style={{
            textAlign: "center",
            padding: 60,
            color: TOKENS.inkSoft,
          }}
        >
          Loading dashboard...
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <TopBar
        title="Parent dashboard"
        accent={TOKENS.skyDeep}
      />

      <StatsCards
        done={done}
        total={tasks.length}
        weekAvgPct={weekAvgPct}
      />

      <CompletionChart week={week} />

      <div
        style={{
          fontWeight: 700,
          fontSize: 14,
          marginBottom: 8,
        }}
      >
        Edit the routine
      </div>

      <TaskList
        tasks={tasks}
        onRemove={removeTask}
        onEdit={editTask}
      />

      <AddTaskForm
        newPeriod={newPeriod}
        setNewPeriod={setNewPeriod}
        newTime={newTime}
        setNewTime={setNewTime}
        newLabel={newLabel}
        setNewLabel={setNewLabel}
        onAdd={addTask}
      />
    </Shell>
  );
}


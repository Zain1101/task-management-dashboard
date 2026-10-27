
import {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";

import Header from "./components/functional/Header";
import MetricsSummary from "./components/functional/MetricsSummary";
import TaskForm from "./components/functional/TaskForm";
import TaskList from "./components/functional/TaskList";
import ActivityLogger from "./components/class/ActivityLogger";

import { useTheme } from "./context/ThemeContext";

import "./App.css";

function App() {
  const { theme } = useTheme();

  // Load saved tasks when application starts
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = JSON.parse(
        localStorage.getItem("dashboardTasks") || "[]"
      );

      return Array.isArray(savedTasks) ? savedTasks : [];
    } catch (error) {
      console.error("Failed to load tasks:", error);
      return [];
    }
  });

  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [activity, setActivity] = useState(null);

  // useEffect: Save tasks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        "dashboardTasks",
        JSON.stringify(tasks)
      );
    } catch (error) {
      console.error("Failed to save tasks:", error);
    }
  }, [tasks]);

  // useEffect: Update browser tab title
  useEffect(() => {
    const pendingCount = tasks.filter(
      (task) => !task.completed
    ).length;

    document.title = `${pendingCount} Pending | Task Dashboard`;
  }, [tasks]);

  // useCallback: Record new activity
  const recordActivity = useCallback((message) => {
    setActivity({
      id: crypto.randomUUID(),
      message,
      time: new Date().toLocaleString(),
    });
  }, []);

  // useCallback: Add a task
  const handleAddTask = useCallback(
    (title, priority) => {
      const newTask = {
        id: crypto.randomUUID(),
        title,
        priority,
        completed: false,
      };

      setTasks((previousTasks) => [
        newTask,
        ...previousTasks,
      ]);

      recordActivity(`Added task: ${title}`);
    },
    [recordActivity]
  );

  // useCallback: Toggle completed/pending status
  const handleToggleTask = useCallback(
    (id) => {
      const selectedTask = tasks.find(
        (task) => task.id === id
      );

      if (!selectedTask) return;

      setTasks((previousTasks) =>
        previousTasks.map((task) =>
          task.id === id
            ? { ...task, completed: !task.completed }
            : task
        )
      );

      recordActivity(
        `${selectedTask.completed ? "Reopened" : "Completed"} task: ${
          selectedTask.title
        }`
      );
    },
    [tasks, recordActivity]
  );

  // useCallback: Delete a task
  const handleDeleteTask = useCallback(
    (id) => {
      const selectedTask = tasks.find(
        (task) => task.id === id
      );

      if (!selectedTask) return;

      setTasks((previousTasks) =>
        previousTasks.filter((task) => task.id !== id)
      );

      recordActivity(`Deleted task: ${selectedTask.title}`);
    },
    [tasks, recordActivity]
  );

  // useCallback: Change status filter
  const handleStatusFilterChange = useCallback(
    (value) => {
      if (value === statusFilter) return;

      setStatusFilter(value);
      recordActivity(`Status filter changed to: ${value}`);
    },
    [statusFilter, recordActivity]
  );

  // useCallback: Change priority filter
  const handlePriorityFilterChange = useCallback(
    (value) => {
      if (value === priorityFilter) return;

      setPriorityFilter(value);
      recordActivity(`Priority filter changed to: ${value}`);
    },
    [priorityFilter, recordActivity]
  );

  // useMemo: Optimize task filtering
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "Completed" && task.completed) ||
        (statusFilter === "Pending" && !task.completed);

      const matchesPriority =
        priorityFilter === "All" ||
        task.priority === priorityFilter;

      return matchesStatus && matchesPriority;
    });
  }, [tasks, statusFilter, priorityFilter]);

  return (
    <div className={`dashboard ${theme}`}>
      <Header
        title="Task Management Dashboard"
        subtitle="Organize your tasks and track your progress."
      />

      <main className="dashboard-content">
        <MetricsSummary tasks={tasks} />

        <div className="dashboard-grid">
          <div className="task-column">
            <TaskForm onAddTask={handleAddTask} />

            <TaskList
              tasks={filteredTasks}
              onToggleTask={handleToggleTask}
              onDeleteTask={handleDeleteTask}
              statusFilter={statusFilter}
              onStatusFilterChange={handleStatusFilterChange}
              priorityFilter={priorityFilter}
              onPriorityFilterChange={handlePriorityFilterChange}
            />
          </div>

          <ActivityLogger activity={activity} />
        </div>
      </main>
    </div>
  );
}

export default App;

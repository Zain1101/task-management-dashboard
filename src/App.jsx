
import { useState } from "react";

import Header from "./components/functional/Header";
import MetricsSummary from "./components/functional/MetricsSummary";
import TaskForm from "./components/functional/TaskForm";
import TaskList from "./components/functional/TaskList";
import ActivityLogger from "./components/class/ActivityLogger";

import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);

  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const [activity, setActivity] = useState(null);

  // Record an activity
  function recordActivity(message) {
    const newActivity = {
      id: crypto.randomUUID(),
      message: message,
      time: new Date().toLocaleString(),
    };

    setActivity(newActivity);
  }

  // Add a new task
  function handleAddTask(title, priority) {
    const newTask = {
      id: crypto.randomUUID(),
      title: title,
      priority: priority,
      completed: false,
    };

    setTasks((previousTasks) => [
      newTask,
      ...previousTasks,
    ]);

    recordActivity(`Added task: ${title}`);
  }

  // Mark task as completed or pending
  function handleToggleTask(id) {
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

    if (selectedTask.completed) {
      recordActivity(
        `Reopened task: ${selectedTask.title}`
      );
    } else {
      recordActivity(
        `Completed task: ${selectedTask.title}`
      );
    }
  }

  // Delete task
  function handleDeleteTask(id) {
    const selectedTask = tasks.find(
      (task) => task.id === id
    );

    if (!selectedTask) return;

    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    );

    recordActivity(
      `Deleted task: ${selectedTask.title}`
    );
  }

  // Change status filter
  function handleStatusFilterChange(value) {
    if (value === statusFilter) return;

    setStatusFilter(value);

    recordActivity(
      `Status filter changed to: ${value}`
    );
  }

  // Change priority filter
  function handlePriorityFilterChange(value) {
    if (value === priorityFilter) return;

    setPriorityFilter(value);

    recordActivity(
      `Priority filter changed to: ${value}`
    );
  }

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Completed" && task.completed) ||
      (statusFilter === "Pending" && !task.completed);

    const matchesPriority =
      priorityFilter === "All" ||
      task.priority === priorityFilter;

    return matchesStatus && matchesPriority;
  });

  return (
    <div className="dashboard">
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

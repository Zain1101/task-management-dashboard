import { useState } from "react";

import Header from "./components/functional/Header";
import MetricsSummary from "./components/functional/MetricsSummary";
import CardWrapper from "./components/functional/CardWrapper";
import TaskForm from "./components/functional/TaskForm";
import TaskList from "./components/functional/TaskList";

import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);

  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

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
  }

  // Toggle task completed/pending status
  function handleToggleTask(id) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  // Delete a task
  function handleDeleteTask(id) {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    );
  }

  // Filter tasks by status and priority
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
              onStatusFilterChange={setStatusFilter}
              priorityFilter={priorityFilter}
              onPriorityFilterChange={setPriorityFilter}
            />
          </div>

          <CardWrapper className="activity-panel">
            <h2>Activity Log</h2>
            <p>
              Recent activities will appear here.
            </p>
          </CardWrapper>
        </div>
      </main>
    </div>
  );
}

export default App;
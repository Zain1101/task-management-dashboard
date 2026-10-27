function TaskCard({ task, onToggleTask, onDeleteTask }) {
  return (
    <div
      className={`task-card ${task.completed ? "task-completed" : ""}`}
    >
      <div className="task-info">
        <div className="task-title-row">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleTask(task.id)}
            aria-label={`Mark ${task.title} as ${
              task.completed ? "pending" : "completed"
            }`}
          />

          <h3>{task.title}</h3>
        </div>

        <div className="task-details">
          <span
            className={`priority-badge ${task.priority.toLowerCase()}`}
          >
            {task.priority} Priority
          </span>

          {task.priority === "High" && (
            <span className="urgent-label">
              ⚡ Urgent
            </span>
          )}

          <span className="task-status">
            {task.completed ? "Completed" : "Pending"}
          </span>
        </div>
      </div>

      <button
        className="delete-btn"
        onClick={() => onDeleteTask(task.id)}
      >
        Delete
      </button>
    </div>
  );
}

export default TaskCard;
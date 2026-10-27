import TaskCard from "./TaskCard";
import CardWrapper from "./CardWrapper";

function TaskList({
  tasks,
  onToggleTask,
  onDeleteTask,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
}) {
  return (
    <CardWrapper>
      <h2>My Tasks</h2>

      <div className="task-filters">
        <select
          value={statusFilter}
          onChange={(e) =>
            onStatusFilterChange(e.target.value)
          }
          aria-label="Filter by status"
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) =>
            onPriorityFilterChange(e.target.value)
          }
          aria-label="Filter by priority"
        >
          <option value="All">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <div className="task-list">
        {tasks.length === 0 ? (
          <p className="empty-message">
            No tasks found. Add a task or change your filters.
          </p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleTask={onToggleTask}
              onDeleteTask={onDeleteTask}
            />
          ))
        )}
      </div>
    </CardWrapper>
  );
}

export default TaskList;
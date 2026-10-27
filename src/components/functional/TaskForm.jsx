import { useState } from "react";
import CardWrapper from "./CardWrapper";

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");

  function handleSubmit(e) {
    e.preventDefault();

    if (title.trim() === "") {
      return;
    }

    onAddTask(title.trim(), priority);

    setTitle("");
    setPriority("Medium");
  }

  return (
    <CardWrapper>
      <h2>Add New Task</h2>

      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="taskTitle">Task Title</label>

          <input
            id="taskTitle"
            type="text"
            placeholder="Enter task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="taskPriority">Priority</label>

          <select
            id="taskPriority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <button type="submit" className="add-btn">
          + Add Task
        </button>
      </form>
    </CardWrapper>
  );
}

export default TaskForm;
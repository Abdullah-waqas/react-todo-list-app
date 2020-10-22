import React, { useState } from "react";
import AddTaskForm from "./AddTaskForm";
import "./TodoList.css";

const ToDoList = () => {
  const [tasks, setTasks] = useState([
    {
      text: "Like",
      isCompleted: false,
    },
    {
      text: "Comment",
      isCompleted: false,
    },
  ]);

  const addTask = (text) => setTasks([...tasks, { text }]);

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].isCompleted = !newTasks[index].isCompleted;
    setTasks(newTasks);
  };

  const removeTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  return (
    <div className="todo-list">
      <h5>Todo list Application</h5>
      <div data-testid="list-container">
        {tasks.map((task, index) => (
          <div data-testid="todo-item" className="todo" key={index}>
            <span
              onClick={() => toggleTask(index)}
              className={
                task.isCompleted ? "todo-text todo-completed" : "todo-text"
              }
            >
              {task.text}
            </span>
            <button data-testid="remove-item" onClick={() => removeTask(index)}>
              x
            </button>
          </div>
        ))}
      </div>
      <AddTaskForm addTask={addTask} />
    </div>
  );
};

export default ToDoList;

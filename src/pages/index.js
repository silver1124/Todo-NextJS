import React, { useState } from "react";
import Link from "next/link";
import TaskList from "../components/TaskList";

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [completedTasks, setCompletedTasks] = useState([]);

  const addTask = () => {
    if (inputValue.trim() !== "") {
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: Date.now(), text: inputValue, completed: false },
      ]);
      setInputValue("");
    }
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    setCompletedTasks((prevCompletedTasks) =>
      prevCompletedTasks.filter((task) => task.id !== taskId)
    );
  };

  const toggleTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );

    setCompletedTasks((prevCompletedTasks) => {
      const taskToMove = tasks.find((task) => task.id === taskId);
      if (taskToMove) {
        if (taskToMove.completed) {
          // If the task is marked as completed, remove it from completedTasks
          return prevCompletedTasks.filter((task) => task.id !== taskId);
        } else {
          // If the task is marked as not completed, add it to completedTasks
          return [...prevCompletedTasks, taskToMove];
        }
      }
      return prevCompletedTasks;
    });
  };

  return (
    <div>
      <h1>ToDo App</h1>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <TaskList
        tasks={tasks}
        onDelete={deleteTask}
        onToggle={toggleTask}
        completedTasks={completedTasks}
      />
      <Link href="/completed">
        <h2>View Completed Tasks</h2>
      </Link>
    </div>
  );
};

export default HomePage;

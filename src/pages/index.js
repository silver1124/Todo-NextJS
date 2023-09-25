import React, { useState } from "react";
import Link from "next/link";
import TaskList from "../components/TaskList";
import { MongoClient } from "mongodb";

// Here initialTodos we get from database .
const HomePage = ({ initialTodos }) => {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState(initialTodos);
  const [completedTasks, setCompletedTasks] = useState([]);

  const addTask = async () => {
    if (inputValue.trim() === "") return;

    const newTask = {
      text: inputValue,
      completed: false,
    };

    // Adding the new task to the server
    await fetch("api/new-task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });

    // update: Adding the new task to the client-side state
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setInputValue("");
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    setCompletedTasks((prevCompletedTasks) =>
      prevCompletedTasks.filter((task) => task.id !== taskId)
    );
  };
  const toggleTask = async (taskId) => {
    // Send a PUT request to update the task's status
    await fetch(`/api/update-task/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: true }), // Update completed to true
    });

    // Update the client-side state
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: true } : task
    );
    setTasks(updatedTasks.filter((task) => !task.completed)); // Filter out completed tasks
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

export async function getStaticProps() {
  // Connect to the MongoDB database
  const client = await MongoClient.connect(
    "mongodb+srv://Todoapp:4sGOzZymIvyU5qYn@cluster0.pvyqnnf.mongodb.net/todo?retryWrites=true&w=majority&appName=AtlasApp"
  );

  const db = client.db();
  // Fetch todos from the database
  const DatabaseTodo = db.collection("todo");

  const Todo = await DatabaseTodo.find().toArray();

  console.log(Todo);
  // Close the MongoDB connection
  client.close();

  return {
    props: {
      // Map todos to the expected format
      initialTodos: Todo.map((todo) => ({
        text: todo.text,
        completed: todo.completed,
        id: todo._id.toString(),
      })),
    },
    revalidate: 1,
  };
}
export default HomePage;
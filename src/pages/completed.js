import React, { useState } from "react";
import TaskList from "../components/TaskList";

const completedTasksData = [];

const Completed = () => {
  const [completedTasks, setCompletedTasks] = useState(completedTasksData);

  return (
    <div>
      <h1>Completed Tasks</h1>
      <TaskList tasks={completedTasks} />
    </div>
  );
};

export default Completed;

import React from "react";
import TaskList from "./TaskList";

const CompletedPage = ({ completedTasks }) => {
  return (
    <div>
      <h1>Completed Tasks</h1>
      <TaskList tasks={completedTasks} />
    </div>
  );
};

export default CompletedPage;

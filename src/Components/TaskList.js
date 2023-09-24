import Task from "./Task";

const TaskList = ({ tasks, onDelete, onToggle }) => {
  return (
    <div>
      {tasks && tasks.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};


export default TaskList;

import React from "react";
import TaskComponent from "./TaskComponent";
import { useSelector } from "react-redux";
import "../styles/taskList.css";
import { Typography } from "@mui/material";

const TaskList = ({ classes }) => {
  const tasks = useSelector((state) => state.taskStore.tasks);
  const areTasks = tasks.length !== 0;
  let tasksRegister = {
    done: [],
    todo: [],
    inProgress: [],
  };
  if (areTasks) {
    tasks.forEach((task) => {
      tasksRegister[task.status].push(task);
    });
  }

  return (
    <div
      className={`${classes} shadow-lg gap-2 sm:py-8 p-2 bg-neo-bg overflow-hidden`}
    >
      <Typography
        variant="h4"
        className="text-center text-3xl font-semibold mb-4"
      >
        Your Tasks
      </Typography>
      <div
        className={`taskList flex flex-col items-center 
          ${areTasks ? "justify-start" : "justify-center"} 
          flex-1 rounded-lg py-4 w-[95%] gap-2 overflow-y-auto no-scrollbar`}
      >
        {areTasks ? (
          <>
            <div className="InProgress w-full flex flex-col gap-2 items-center">
              {tasksRegister["inProgress"].map((task) => (
                <TaskComponent key={task.id} taskData={task} />
              ))}
            </div>
            <div className="Todo w-full flex flex-col gap-2 items-center">
              {tasksRegister["todo"].map((task) => (
                <TaskComponent key={task.id} taskData={task} />
              ))}
            </div>
            <div className="Done w-full flex flex-col gap-2 items-center">
              {tasksRegister["done"].map((task) => (
                <TaskComponent key={task.id} taskData={task} />
              ))}
            </div>
          </>
        ) : (
          <p className="text-center text-3xl text-semibold">No Tasks</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;

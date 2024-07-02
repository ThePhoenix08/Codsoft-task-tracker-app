import React from "react";
import { useSelector } from "react-redux";
import { PieChart } from "@mui/x-charts/PieChart";
import { Typography } from "@mui/material";

const TaskAnalytics = ({ classes }) => {
  const tasks = useSelector((state) => state.taskStore.tasks);
  const totalTasks = tasks.length;
  const taskStatusCount = {
    todo: tasks.filter((task) => task.status === "todo").length,
    inProgress: tasks.filter((task) => task.status === "inProgress").length,
    done: tasks.filter((task) => task.status === "done").length,
  };

  const data = [
    { id: 0, color: "#42a5f5", label: "Todo", value: taskStatusCount.todo },
    {
      id: 1,
      color: "#ffca28",
      label: "In Progress",
      value: taskStatusCount.inProgress,
    },
    { id: 2, color: "#66bb6a", label: "Done", value: taskStatusCount.done },
  ];

  return (
    <div className={`${classes} p-8 rounded-lg gap-8`}>
      <Typography
        variant="h4"
        className="text-center text-3xl font-semibold mb-4"
      >
        Task Analytics
      </Typography>
      <div className="w-full flex justify-center items-center">
        <PieChart
          series={[
            {
              data,
              highlightScope: { faded: "global", highlighted: "item" },
              faded: { innerRadius: 30, additionalRadius: -30 },
              paddingAngle: 2,
              outerRadius: 120,
              cornerRadius: 5,
              innerRadius: 5,
              cx: 125,
              cy: 125,
            },
          ]}
          slotProps={{
            legend: { hidden: true },
          }}
          height={250}
          width={250}
        />
      </div>
      <div className="flex flex-col gap-2 items-center sm:gap-4 w-full">
        <div className="flex flex-col items-center w-5/6 bg-neo-bg p-4 rounded-lg shadow-neomorphism border-2 border-[#42a5f5]">
          <Typography className="text-xl">
            Total Todos: {taskStatusCount.todo}
          </Typography>
        </div>
        <div className="flex flex-col items-center w-5/6 bg-neo-bg p-4 rounded-lg shadow-neomorphism border-2 border-[#ffca28]">
          <Typography className="text-xl">
            Total In Progress: {taskStatusCount.inProgress}
          </Typography>
        </div>
        <div className="flex flex-col items-center w-5/6 bg-neo-bg p-4 rounded-lg shadow-neomorphism border-2 border-[#66bb6a]">
          <Typography className="text-xl">
            Total Done: {taskStatusCount.done}
          </Typography>
        </div>
        <div className="flex flex-col items-center w-5/6 bg-neo-bg p-4 rounded-lg shadow-neomorphism mt-4">
          <Typography className="text-xl font-semibold">
            Total Tasks: {totalTasks}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default TaskAnalytics;

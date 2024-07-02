import React, { useEffect, useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import AddTaskIcon from "@mui/icons-material/AddTask";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { useDispatch, useSelector } from "react-redux";
import { addTask, setCurrentTask, updateTask } from "../store/taskSlice";

const TaskForm = ({ classes }) => {
  const dispatch = useDispatch();
  const currentTask = useSelector((state) => state.taskStore.currentTask);
  const resetForm = {
    title: "",
    description: "",
    status: "todo",
  };

  const [taskData, setTaskData] = useState(resetForm);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (currentTask) {
      setTaskData({
        title: currentTask.title,
        description: currentTask.description,
        status: currentTask.status,
      });
      setEdit(true);
    } else {
      setTaskData(resetForm);
      setEdit(false);
    }
  }, [currentTask]);

  const handleStatusChange = (newStatus) => {
    setTaskData((prev) => ({
      ...prev,
      status: newStatus,
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTaskData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!taskData.title || !taskData.description || !taskData.status) {
      console.log("Please fill all fields.");
      return;
    }

    if (edit) {
      dispatch(
        updateTask({
          taskId: currentTask.id,
          updateData: taskData,
        })
      );
      dispatch(setCurrentTask(null));
    } else {
      dispatch(addTask({ taskData }));
    }

    setTaskData(resetForm);
  };

  const ChipStyles = (backgroundColor, taskCategory) => {
    const isActive = taskCategory === taskData.status;

    return {
      backgroundColor: isActive ? "white" : backgroundColor,
      color: "black",
      boxShadow: isActive
        ? "inset 3px 3px 16px #b8b9be, inset -3px -3px 16px #fff"
        : "9px 9px 16px #b8b9be, -9px -9px 16px #ffffff",
      "&:hover": {
        boxShadow: "inset 3px 3px 16px #b8b9be, inset -3px -3px 16px #fff",
        backgroundColor: "white",
      },
    };
  };

  return (
    <div
      className={`${classes} rounded-lg sm:px-8 py-8 px-4 gap-8 justify-center`}
    >
      <Typography
        variant="h4"
        className="text-center text-3xl font-semibold mb-4"
      >
        Create New Task
      </Typography>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center gap-4 text-lg"
      >
        <TextField
          className="w-5/6 rounded-lg bg-gray-100 p-4 shadow-neomorphism-inset focus:shadow-neomorphism-focus"
          id="title"
          name="title"
          label="Task Title"
          variant="filled"
          onChange={handleChange}
          value={taskData.title}
          fullWidth
          required
        />
        <TextField
          className="w-5/6 rounded-lg bg-gray-100 p-4 shadow-neomorphism-inset focus:shadow-neomorphism-focus"
          id="description"
          name="description"
          label="Task Description"
          variant="filled"
          onChange={handleChange}
          multiline
          rows={4}
          value={taskData.description}
          fullWidth
          required
          inputProps={{ maxLength: 155 }}
        />
        <div className="flex flex-col gap-4 sm:flex-row justify-evenly w-5/6">
          <Button
            onClick={() => handleStatusChange("todo")}
            size="large"
            className="cursor-pointer"
            sx={{ ...ChipStyles("#42a5f5", "todo") }}
          >
            Todo
          </Button>
          <Button
            onClick={() => handleStatusChange("inProgress")}
            size="large"
            className="cursor-pointer"
            sx={{ ...ChipStyles("#ffca28", "inProgress") }}
          >
            In Progress
          </Button>
          <Button
            onClick={() => handleStatusChange("done")}
            size="large"
            className="cursor-pointer"
            sx={{ ...ChipStyles("#66bb6a", "done") }}
          >
            Done
          </Button>
        </div>
        <Button
          type="submit"
          variant="contained"
          endIcon={edit ? <SaveAsIcon /> : <AddTaskIcon />}
          size="large"
          sx={{
            mt: 4,
            color: "black",
            borderRadius: "1rem",
            boxShadow: "9px 9px 16px #b8b9be, -9px -9px 16px #ffffff",
            "&:hover": {
              boxShadow:
                "inset 9px 9px 16px #b8b9be, inset -9px -9px 16px #ffffff",
              backgroundColor: "#f9f9f9",
            },
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            backgroundColor: "#f9f9f9",
          }}
        >
          {edit ? "Update Task" : "Add Task"}
        </Button>
      </form>
    </div>
  );
};

export default TaskForm;

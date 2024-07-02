import React, { useEffect, useState } from "react";
import { IconButton, Chip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, setCurrentTask, updateTask } from "../store/taskSlice";

import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import QueueIcon from "@mui/icons-material/Queue";
import DoneIcon from "@mui/icons-material/Done";
import EditNoteIcon from "@mui/icons-material/EditNote";

const TaskComponent = ({ taskData }) => {
  const { title, description, id, status } = taskData;
  const [state, setState] = useState(status);

  const [edit, setEdit] = useState(false);
  const currentTask = useSelector((state) => state.taskStore.currentTask);
  const dispatch = useDispatch();

  const handleMarkComplete = () => {
    let newState;
    switch (state) {
      case "todo":
        newState = "inProgress";
        break;
      case "inProgress":
        newState = "done";
        break;
      case "done":
        newState = "todo";
        break;
      default:
        newState = state;
    }

    setState(newState);

    dispatch(
      updateTask({
        taskId: id,
        updateData: { status: newState },
      })
    );
  };

  const handleDelete = () => {
    dispatch(deleteTask({ taskId: id }));
  };

  let color, icon;
  switch (state) {
    case "todo": {
      color = "primary";
      icon = <QueueIcon />;
      break;
    }
    case "done": {
      color = "success";
      icon = <ClearIcon />;
      break;
    }
    case "inProgress": {
      color = "warning";
      icon = <DoneIcon />;
      break;
    }
  }

  const handleEditTask = () => {
    setEdit((prev) => !prev);
    if (!edit) {
      dispatch(setCurrentTask(taskData));
    } else {
      dispatch(setCurrentTask(null));
    }
  };

  useEffect(() => {
    if (currentTask == null) setEdit(false);
  }, [currentTask]);

  return (
    <div
      className={`sm:w-11/12 w-[99%] bg-neo-bg rounded-3xl p-4 flex flex-col justify-between items-start 
        ${edit ? "shadow-neomorphism" : "shadow-neomorphism-inset"}
        h-auto min-h-[1rem] overflow-auto gap-4`}
    >
      <div className="flex w-full justify-between gap-2">
        <div className="details">
          <p className="text-xl font-semibold text-gray-700">{title}</p>
        </div>
        <div className="options flex space-x-2 items-center justify-end w-full sm:w-auto sm:justify-end">
          <Chip label={state} color={color} />
          <IconButton
            className="bg-neo-bg rounded-full shadow-neomorphism hover:shadow-neomorphism-inset"
            aria-label="mark as complete"
            onClick={handleMarkComplete}
            disabled={edit}
          >
            {icon}
          </IconButton>
          <IconButton
            className="bg-neo-bg rounded-full shadow-neomorphism hover:shadow-neomorphism-inset"
            aria-label="edit task"
            onClick={handleEditTask}
          >
            {edit ? <ClearIcon /> : <EditNoteIcon />}
          </IconButton>
          <IconButton
            className="bg-neo-bg rounded-full shadow-neomorphism hover:shadow-neomorphism-inset"
            aria-label="delete task"
            onClick={handleDelete}
            disabled={edit}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
      <div className="description">
        <p className="text-gray-700 flex-1">{description}</p>
      </div>
    </div>
  );
};

export default TaskComponent;

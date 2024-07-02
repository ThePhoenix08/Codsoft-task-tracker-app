import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import setLocalState from "../utils/setLocalState.js";

const initialTasks = () => {
  const localStorageData = localStorage.getItem("TASKS");
  if (localStorageData == null) return [];
  try {
    const taskArray = JSON.parse(localStorageData).tasks;
    if (Array.isArray(taskArray)) {
      return taskArray;
    }
  } catch (e) {
    console.error("Failed to parse tasks from localStorage:", e);
    return [];
  }
};

export const taskSlice = createSlice({
  name: "taskStore",
  initialState: {
    tasks: initialTasks(),
    currentTask: null,
  },
  reducers: {
    addTask: (state, action) => {
      const { taskData } = action.payload;
      const newTask = { ...taskData, id: uuidv4() };
      state.tasks = [...state.tasks, newTask];
      setLocalState(state);
    },
    deleteTask: (state, action) => {
      const { taskId } = action.payload;
      const newState = state.tasks.filter((task) => task.id !== taskId);
      state.tasks = newState;
      setLocalState(state);
    },
    updateTask: (state, action) => {
      // console.log("update request recieved: ", action.payload.taskId);
      const { taskId, updateData } = action.payload;
      state.tasks = state.tasks.map((task) =>
        task.id === taskId ? { ...task, ...updateData } : task
      );
      setLocalState(state);
    },
    setCurrentTask: (state, action) => {
      state.currentTask = action.payload;
      setLocalState(state);
    },
  },
});

export const { addTask, deleteTask, updateTask, setCurrentTask } =
  taskSlice.actions;

export default taskSlice.reducer;

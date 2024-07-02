import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice.js";

const store = configureStore({
  reducer: {
    taskStore: taskReducer,
  },
});

export default store;

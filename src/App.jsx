import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import TaskAnalytics from "./components/TaskAnalytics";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  return (
    <div className="grid place-items-center font-[roboto] w-screen h-screen">
      <div className="flex flex-row flex-wrap xl:flex-nowrap w-[95%] sm:h-[95%] sm:flex-row items-center xl:gap-8 sm:w-[95%] xl:overflow-hidden">
        <TaskAnalytics classes="flex flex-col border-2 rounded-lg md:h-screen xl:h-full xl:w-1/3 md:w-1/2 w-full justify-center items-center" />
        <TaskForm classes="flex flex-col border-2 rounded-lg md:h-screen xl:h-full xl:w-1/3 w-full md:w-1/2 items-center" />
        <TaskList classes="flex flex-col border-2 rounded-lg xl:h-full xl:w-1/3 w-full items-center" />
      </div>
    </div>
  );
}

export default App;


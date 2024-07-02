const setLocalState = (reduxState) => {
  localStorage.setItem("TASKS", JSON.stringify(reduxState));
};

export default setLocalState;

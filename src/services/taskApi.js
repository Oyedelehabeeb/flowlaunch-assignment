import { v4 as uuidv4 } from "uuid";

const BASE_URL = "https://jsonplaceholder.typicode.com/todos";

export const fetchTasks = async () => {
  const response = await fetch(BASE_URL);
  const apiData = await response.json();

  const apiTasks = apiData.slice(0, 20).map((todo) => ({
    id: todo.id,
    title: todo.title,
    description: "",
    status: todo.completed ? "Done" : "To Do",
    isLocalTask: false,
  }));

  return apiTasks;
};

export const addTask = async (task) => {
  const newTask = {
    id: uuidv4(),
    title: task.title,
    description: task.description || "",
    status: task.status,
    completed: task.status === "Done",
    isLocalTask: true,
  };

  const localTasks = JSON.parse(localStorage.getItem("localTasks") || "[]");

  const updatedLocalTasks = [...localTasks, newTask];

  localStorage.setItem("localTasks", JSON.stringify(updatedLocalTasks));

  console.log("New task added to localStorage:", newTask);
  console.log("Updated local tasks:", updatedLocalTasks);

  return newTask;
};

export async function updateTask(taskId, updatedTaskData) {
  try {
    const tasks = JSON.parse(localStorage.getItem("localTasks")) || [];

    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, ...updatedTaskData } : task
    );

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    return updatedTasks;
  } catch (error) {
    console.error("Error updating task:", error);
  }
}

export const deleteTask = async (taskId) => {
  const localTasks = JSON.parse(localStorage.getItem("localTasks") || "[]");
  const updatedLocalTasks = localTasks.filter((task) => task.id !== taskId);
  localStorage.setItem("localTasks", JSON.stringify(updatedLocalTasks));

  return { id: taskId };
};

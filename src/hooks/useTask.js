import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as taskApi from "../services/taskApi";
import toast from "react-hot-toast";
import { fetchTasks } from "../services/taskApi";

const getStoredTasks = () => {
  return JSON.parse(localStorage.getItem("localTasks") || "[]");
};

export const useTaskQuery = () => {
  return useQuery(
    ["tasks"],
    async () => {
      const apiTasks = await fetchTasks();

      const localTasks = JSON.parse(
        localStorage.getItem("localTasks") || "[]"
      ).filter(
        (localTask) => !apiTasks.some((apiTask) => apiTask.id === localTask.id)
      );

      return [...apiTasks, ...localTasks];
    },
    {
      refetchOnWindowFocus: false,
    }
  );
};

export const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation(taskApi.addTask, {
    onSuccess: (newTask) => {
      toast.success("Task added successfully!");

      queryClient.setQueryData(["tasks"], (oldTasks) => {
        const tasksArray = Array.isArray(oldTasks) ? oldTasks : [];
        return [...tasksArray, newTask];
      });
    },
    onError: (error) => {
      toast.error("Failed to add task. Please try again.");
      console.error(error);
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ taskId, updatedTask }) => {
      const tasks = getStoredTasks();
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      );

      localStorage.setItem("localTasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    },
    {
      onSuccess: (updatedTasks) => {
        queryClient.setQueryData(["tasks"], updatedTasks);
        toast.success("Task updated successfully!");
      },
    }
  );
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation(taskApi.deleteTask, {
    onSuccess: (deletedTask) => {
      queryClient.setQueryData(["tasks"], (oldTasks) =>
        oldTasks.filter((task) => task.id !== deletedTask.id)
      );

      const localTasks = JSON.parse(localStorage.getItem("localTasks") || "[]");
      const updatedLocalTasks = localTasks.filter(
        (task) => task.id !== deletedTask.id
      );
      localStorage.setItem("localTasks", JSON.stringify(updatedLocalTasks));

      toast.success("Task successfully deleted!");
    },
    onError: (error) => {
      toast.error("Failed to delete task. Please try again.");
      console.error(error);
    },
  });
};

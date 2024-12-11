import { useState } from "react";
import { useAddTask } from "../hooks/useTask";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");

  const addTaskMutation = useAddTask();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      title: title.trim(),
      description: description.trim(),
      status: status,
    };

    addTaskMutation.mutate(newTask, {
      onSuccess: () => {
        setTitle("");
        setDescription("");
        setStatus("To Do");
      },
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Add New Task
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="col-span-1">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter task title"
          />
        </div>

        <div className="col-span-1">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <div className="col-span-1 md:col-span-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Description (Optional)
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter task description"
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <button
            type="submit"
            disabled={addTaskMutation.isLoading}
            className={`
              w-full py-3 px-4 rounded-md text-white font-semibold transition-colors
              ${
                addTaskMutation.isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              }
            `}
          >
            {addTaskMutation.isLoading ? "Adding Task..." : "Add Task"}
          </button>
        </div>

        {addTaskMutation.isError && (
          <div className="col-span-1 md:col-span-2 text-red-500 text-sm mt-2">
            Error adding task: {addTaskMutation.error.message}
          </div>
        )}
      </form>
    </div>
  );
};

export default AddTask;

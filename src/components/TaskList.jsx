/* eslint-disable react/prop-types */
import { Check, Clock, List, X } from "lucide-react";

function TaskList({ task }) {
  const statusColors = {
    "To Do": "bg-blue-100 text-blue-800",
    "In Progress": "bg-yellow-100 text-yellow-800",
    Done: "bg-green-100 text-green-800",
  };

  const statusIcons = {
    "To Do": <Clock className="text-blue-500" />,
    "In Progress": <List className="text-yellow-500" />,
    Done: <Check className="text-green-500" />,
  };
  return (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition">
      <div className="flex items-center space-x-4">
        {statusIcons[task.status]}
        <span className="font-medium text-gray-800">{task.title}</span>
        <span
          className={`
                      px-2 py-1 rounded-full text-xs font-semibold
                      ${statusColors[task.status]}
                    `}
        >
          {task.status}
        </span>
      </div>
      <div className="flex space-x-2">
        <button className="text-blue-500 hover:bg-blue-100 p-2 rounded-full">
          <List size={18} />
        </button>
        <button className="text-red-500 hover:bg-red-100 p-2 rounded-full">
          <X size={18} />
        </button>
      </div>
    </div>
  );
}

export default TaskList;

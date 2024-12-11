import { Filter, List, Plus, Menu, X, Search } from "lucide-react";
import { useMemo, useState } from "react";
import AddTask from "./AddTask";
import TaskTable from "./TaskTable";
import { useTaskQuery } from "../hooks/useTask";

function Dashboard() {
  const { data: tasks } = useTaskQuery();
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [activeView, setActiveView] = useState("taskTable");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const countTask = useMemo(() => {
    if (!tasks) return { All: 0, "To Do": 0, "In Progress": 0, Done: 0 };
    return {
      All: tasks?.length,
      "To Do": tasks.filter((task) => task.status === "To Do")?.length,
      "In Progress": tasks.filter((task) => task.status === "In Progress")
        ?.length,
      Done: tasks.filter((task) => task.status === "Done")?.length,
    };
  }, [tasks]);

  const filterOptions = ["All", "To Do", "In Progress", "Done"];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleViewChange = (view) => {
    setActiveView(view);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="container mx-auto max-w-5xl">
        <header className="mb-8 flex justify-between items-center relative">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Task Manager
          </h1>

          <div className="block md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-600 hover:text-gray-800"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <button
            onClick={() =>
              handleViewChange(
                activeView === "taskTable" ? "addTask" : "taskTable"
              )
            }
            className="hidden md:flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            {activeView === "taskTable" ? (
              <>
                <Plus className="mr-2" /> Add Task
              </>
            ) : (
              <>
                <List className="mr-2" /> Task List
              </>
            )}
          </button>
        </header>

        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 md:hidden"
            onClick={toggleMobileMenu}
          >
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] bg-white rounded-lg shadow-lg p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-4">
                <button
                  onClick={() => handleViewChange("taskTable")}
                  className={`w-full py-3 rounded-lg transition ${
                    activeView === "taskTable"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <List className="mr-2 inline" /> Task List
                </button>
                <button
                  onClick={() => handleViewChange("addTask")}
                  className={`w-full py-3 rounded-lg transition ${
                    activeView === "addTask"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <Plus className="mr-2 inline" /> Add Task
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Search input and dropdown filter. */}
        <div className="mb-6 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center w-full sm:w-auto bg-white border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
            <Search className="text-indigo-600" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="ml-2 w-full sm:w-auto outline-none"
            />
          </div>

          <div className="flex items-center w-full sm:w-auto">
            <Filter className="text-indigo-600 hidden sm:block" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {filterOptions.map((filter) => (
                <option key={filter} value={filter}>
                  {filter} ({countTask[filter]})
                </option>
              ))}
            </select>
          </div>
        </div>

        {activeView === "taskTable" ? (
          <TaskTable selectedFilter={selectedFilter} searchTerm={searchTerm} />
        ) : (
          <AddTask />
        )}
      </div>
    </div>
  );
}

export default Dashboard;

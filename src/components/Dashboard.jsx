import { Filter, List, Plus, Menu, X } from "lucide-react";
import { useState } from "react";
import AddTask from "./AddTask";
import TaskTable from "./TaskTable";

function Dashboard() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [activeView, setActiveView] = useState("taskTable");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

        {/* Dropdown filter */}
        <div className="mb-6 flex items-center space-x-4">
          <Filter className="text-indigo-600 hidden sm:block" />
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {filterOptions.map((filter) => (
              <option key={filter} value={filter}>
                {filter}
              </option>
            ))}
          </select>
        </div>

        {activeView === "taskTable" ? (
          <TaskTable selectedFilter={selectedFilter} />
        ) : (
          <AddTask />
        )}
      </div>
    </div>
  );
}

export default Dashboard;

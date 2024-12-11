/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo } from "react";
import { useTaskQuery, useUpdateTask, useDeleteTask } from "../hooks/useTask";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import Spinner from "./Spinner";
import PageNotFound from "./PageNotFound";

const TaskTable = ({ selectedFilter = "All" }) => {
  const { data: tasks, isLoading, error } = useTaskQuery();
  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();
  const [table, setTable] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    if (tasks) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    if (!tasks) return [];
    if (selectedFilter === "All") return tasks;
    return tasks.filter((task) => task.status === selectedFilter);
  }, [tasks, selectedFilter]);

  const tableConfig = useMemo(
    () => ({
      layout: "fitColumns",
      layoutColumnsOnNewData: true,
      preventPageReload: true,
      columns: [
        {
          title: "Task ID",
          field: "id",
          width: 100,
        },
        {
          title: "Title",
          field: "title",
          editor: "input",
          editorParams: {
            elementAttributes: {
              onkeydown: (e) => {
                if (e.key === "Enter") e.preventDefault();
              },
            },
          },
          cellEdited: (cell) => {
            const rowData = cell.getRow().getData();
            const updatedField = { title: cell.getValue() };

            cell.getRow().update({ ...rowData, ...updatedField });

            updateTaskMutation.mutate({
              taskId: rowData.id,
              updatedTask: updatedField,
            });
          },
        },
        {
          title: "Description",
          field: "description",
          editor: "input",
          editorParams: {
            elementAttributes: {
              onkeydown: (e) => {
                if (e.key === "Enter") e.preventDefault();
              },
            },
          },
          cellEdited: (cell) => {
            const rowData = cell.getRow().getData();
            const updatedField = { description: cell.getValue() };

            cell.getRow().update({ ...rowData, ...updatedField });

            updateTaskMutation.mutate({
              taskId: rowData.id,
              updatedTask: updatedField,
            });
          },
        },
        {
          title: "Status",
          field: "status",
          editor: "input",
          cellEdited: (cell) => {
            const rowData = cell.getRow().getData();
            const updatedField = { status: cell.getValue() };

            cell.getRow().update({ ...rowData, ...updatedField });

            updateTaskMutation.mutate({
              taskId: rowData.id,
              updatedTask: updatedField,
            });
          },
        },
        {
          title: "Delete",
          field: "delete",
          formatter: () => {
            return `<button class="delete-btn text-red-500 hover:text-red-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>`;
          },
          width: 80,
          hozAlign: "center",
          cellClick: (e, cell) => {
            const task = cell.getRow().getData();
            setTaskToDelete(task);
            setDeleteModalOpen(true);
          },
        },
      ],
    }),
    [updateTaskMutation]
  );

  const handleDeleteConfirm = () => {
    if (taskToDelete) {
      deleteTaskMutation.mutate(taskToDelete.id);
      setDeleteModalOpen(false);
      setTaskToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setTaskToDelete(null);
  };

  useEffect(() => {
    if (!filteredTasks.length || table) return;

    const newTable = new Tabulator("#task-table", {
      ...tableConfig,
      data: filteredTasks,
    });

    setTable(newTable);

    return () => {
      if (table) table.destroy();
    };
  }, [filteredTasks, tableConfig, table]);

  useEffect(() => {
    if (table && filteredTasks) {
      table.replaceData(filteredTasks);
    }
  }, [filteredTasks, table]);

  if (isLoading) return <Spinner />;
  if (error) return <PageNotFound />;

  return (
    <>
      <div id="task-table" />
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        taskTitle={taskToDelete?.title || ""}
      />
    </>
  );
};

export default TaskTable;

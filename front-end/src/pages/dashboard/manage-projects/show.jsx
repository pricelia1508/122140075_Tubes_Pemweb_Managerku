// src/routes/dashboard/manage-projects/[id]/ShowManageProject.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProjects } from "@/hooks/useProjects";
import { useTasks } from "@/hooks/useTasks";
import DashboardLayout from "@/layouts/dashboard-layout";
import IndexNotFound from "@/pages/not-found";
import TaskDialog from "@/components/dialog/task-dialog";
import TaskCard from "@/components/card/card-task";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { CalendarDays, Info, Layers, FileClock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function ShowManageProject() {
  const navigate = useNavigate();
  const { checkSession } = useAuth();

  // 🔐 Check session on mount
  useEffect(() => {
    const session = checkSession();

    if (!session.isValid) {
      navigate("/login");
    }
  }, []);

  const { projectId } = useParams();
  const {
    getProjectById,
    loading: projectLoading,
    error: projectError,
  } = useProjects();
  const { getTasksByProjectId, loading: taskLoading, deleteTask } = useTasks();

  const project = getProjectById(projectId);
  const tasks = getTasksByProjectId(projectId);

  const [filterStatus, setFilterStatus] = useState("all");

  const filteredTasks =
    filterStatus === "all"
      ? tasks
      : tasks.filter((task) => task.status === filterStatus);

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId);
  };

  if (projectLoading || taskLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-40">
          <p>Loading...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (projectError || !project) {
    return <IndexNotFound />;
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-8">
        {/* 🧾 Project Overview */}
        <section>
          <h1 className="text-2xl font-bold mb-4">Project Overview</h1>

          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Layers size={20} className="text-gray-700" />
                <h2 className="text-xl font-semibold text-gray-900">
                  {project.name}
                </h2>
              </div>

              <div className="flex items-start gap-2 text-sm text-gray-600">
                <Info size={16} className="mt-0.5 text-gray-500" />
                <p>{project.description}</p>
              </div>

              <div>
                <span
                  className={`inline-block text-xs font-medium px-3 py-1 rounded-full shadow-sm ${
                    project.status === "ongoing"
                      ? "bg-green-100 text-green-800"
                      : project.status === "planning"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {project.status.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CalendarDays size={14} />
                  <p>
                    <span className="font-medium">Start:</span>{" "}
                    {project.start_date}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays size={14} />
                  <p>
                    <span className="font-medium">End:</span>{" "}
                    {project.ends_date}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <FileClock size={14} />
                  <p>
                    <span className="font-medium">Created:</span>{" "}
                    {project.created_at}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <FileClock size={14} />
                  <p>
                    <span className="font-medium">Updated:</span>{" "}
                    {project.updated_at}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ✅ Task List Section */}
        <section>
          <div className="flex flex-col md:flex-row items-start justify-between md:items-center mb-4">
            <h2 className="text-xl font-bold">Tasks</h2>

            <div className="flex gap-2 justify-between w-full md:w-fit">
              <Select
                value={filterStatus}
                onValueChange={(value) => setFilterStatus(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="todo">Todo</SelectItem>
                  <SelectItem value="not started">Not Started</SelectItem>
                  <SelectItem value="in progress">In Progress</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="finished">Finished</SelectItem>
                </SelectContent>
              </Select>

              <TaskDialog
                triggerText={<Button>Create Task</Button>}
                projectId={project.id}
              />
            </div>
          </div>

          {filteredTasks.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 italic">
              No tasks found for this project.
            </p>
          ) : (
            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onDelete={handleDeleteTask}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}

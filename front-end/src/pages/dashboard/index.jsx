import DashboardLayout from "@/layouts/dashboard-layout";
import { useProjects } from "@/hooks/useProjects";
import { useTasks } from "@/hooks/useTasks";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import {
  FolderKanban,
  ListTodo,
  Loader2,
  CheckCheck,
  FolderOpenDot,
  Calendar,
  ListChecks,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { user } = useAuth();
  const {
    projects,
    loading: projectsLoading,
    error: projectsError,
  } = useProjects();
  const { tasks, loading: tasksLoading, error: tasksError } = useTasks();

  // Ambil semua project
  // Lalu cari ID project yang dimiliki oleh user saat ini
  const userProjectIds = projects
    .filter((project) => project.user_id === user?.id)
    .map((project) => project.id);

  // Gabungkan semua project, tapi hanya ambil task milik project user
  const mergedData = projects.map((project) => ({
    ...project,
    tasks: tasks.filter(
      (task) =>
        task.project_id === project.id &&
        userProjectIds.includes(task.project_id)
    ),
  }));

  const totalProjects = mergedData.length;
  const totalTasks = mergedData.reduce(
    (acc, project) => acc + (project.tasks?.length || 0),
    0
  );

  const totalInProgress = mergedData.filter(
    (p) => p.status === "in progress"
  ).length;

  const totalCompleted = mergedData.filter(
    (p) => p.status === "finished" || p.status === "completed"
  ).length;

  if (projectsLoading || tasksLoading) {
    return (
      <DashboardLayout>
        <div className="p-6">Loading...</div>
      </DashboardLayout>
    );
  }

  if (projectsError || tasksError) {
    return (
      <DashboardLayout>
        <div className="p-6 text-red-600">
          Error: {projectsError || tasksError}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-8">
        <h1 className="text-2xl font-bold text-gray-800">Project Dashboard</h1>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow border border-gray-200 p-5 flex items-center gap-4">
            <FolderKanban className="text-blue-600" size={28} />
            <div>
              <p className="text-sm text-gray-500">Total Projects</p>
              <p className="text-xl font-semibold text-gray-800">
                {totalProjects}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow border border-gray-200 p-5 flex items-center gap-4">
            <ListTodo className="text-indigo-600" size={28} />
            <div>
              <p className="text-sm text-gray-500">Total Tasks</p>
              <p className="text-xl font-semibold text-gray-800">
                {totalTasks}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow border border-gray-200 p-5 flex items-center gap-4">
            <Loader2 className="text-yellow-600" size={28} />
            <div>
              <p className="text-sm text-gray-500">Projects In Progress</p>
              <p className="text-xl font-semibold text-yellow-600">
                {totalInProgress}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow border border-gray-200 p-5 flex items-center gap-4">
            <CheckCheck className="text-green-600" size={28} />
            <div>
              <p className="text-sm text-gray-500">Projects Completed</p>
              <p className="text-xl font-semibold text-green-600">
                {totalCompleted}
              </p>
            </div>
          </div>
        </div>

        {/* Task Status Report */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Task Status Overview
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
              "todo",
              "not started",
              "in progress",
              "pending",
              "completed",
              "finished",
            ].map((status) => {
              const count = mergedData
                .flatMap((project) => project.tasks)
                .filter((task) => task.status === status).length;

              const label = status
                .split(" ")
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(" ");

              const iconColorMap = {
                todo: "text-blue-600",
                "not started": "text-gray-600",
                "in progress": "text-yellow-600",
                pending: "text-orange-600",
                completed: "text-green-600",
                finished: "text-emerald-700",
              };

              return (
                <div
                  key={status}
                  className="bg-white rounded-xl shadow border border-gray-200 p-5 flex items-center gap-4"
                >
                  <ListTodo className={iconColorMap[status]} size={28} />
                  <div>
                    <p className="text-sm text-gray-500">{label}</p>
                    <p
                      className={`text-xl font-semibold ${iconColorMap[status]}`}
                    >
                      {count}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Latest Projects */}
        <div className="w-full">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FolderOpenDot size={20} /> Latest Projects
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mergedData.length === 0 ? (
              <div className="col-span-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white border border-dashed border-gray-300 rounded-xl p-6">
                <span className="text-gray-600">No projects available.</span>
                <Link to="/dashboard/manage-projects" className="sm:ml-auto">
                  <Button>Create a new project</Button>
                </Link>
              </div>
            ) : (
              mergedData.map((project) => (
                <Link
                  key={project.id}
                  to={`/dashboard/manage-projects/${project.id}`}
                  className="relative group rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-200"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent opacity-10 pointer-events-none" />
                  <div className="relative z-10 p-5 flex flex-col justify-between h-full bg-white">
                    <div className="flex flex-col gap-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {project.name}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                    <div className="mt-4 flex justify-between items-center text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        Start: {project.start_date}
                      </span>
                      <span className="flex items-center gap-1">
                        <ListChecks size={12} />
                        Status: {project.status}
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

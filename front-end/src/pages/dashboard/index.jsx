import DashboardLayout from "@/layouts/dashboard-layout";
import { useProjectsWithTasks } from "@/hooks/useProjectsWithTasks";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { projects, loading, error } = useProjectsWithTasks();

  const totalProjects = projects.length;
  const totalTasks = projects.reduce(
    (acc, project) => acc + (project.tasks?.length || 0),
    0
  );

  const totalInProgress = projects.filter(
    (p) => p.status === "in_progress"
  ).length;
  const totalCompleted = projects.filter(
    (p) => p.status === "done" || p.status === "completed"
  ).length;

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Project Overview
        </h1>

        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : error ? (
          <p className="text-red-600">Error: {error.message}</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-sm text-muted-foreground mb-1">
                  Total Projects
                </h3>
                <p className="text-2xl font-semibold text-primary">
                  {totalProjects}
                </p>
              </div>
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-sm text-muted-foreground mb-1">
                  Total Tasks
                </h3>
                <p className="text-2xl font-semibold text-primary">
                  {totalTasks}
                </p>
              </div>
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-sm text-muted-foreground mb-1">
                  Projects In Progress
                </h3>
                <p className="text-2xl font-semibold text-yellow-600">
                  {totalInProgress}
                </p>
              </div>
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-sm text-muted-foreground mb-1">
                  Projects Completed
                </h3>
                <p className="text-2xl font-semibold text-green-600">
                  {totalCompleted}
                </p>
              </div>
            </div>

            {/* Optional: list recent project summaries */}
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Latest Projects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.slice(0, 3).map((project) => (
                <Link
                  to={`/dashboard/manage-projects/${project.id}`}
                  key={project.id}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
                >
                  <h3 className="text-lg font-semibold text-primary mb-1">
                    {project.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Tasks: {project.tasks?.length ?? 0} • Status:{" "}
                    <span className="capitalize">
                      {project.status.replace("_", " ")}
                    </span>
                  </p>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

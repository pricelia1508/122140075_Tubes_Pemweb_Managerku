import React, { useEffect } from "react";
import { useProjects } from "@/hooks/useProjects";
import DashboardLayout from "@/layouts/dashboard-layout";
import ProjectDialog from "@/components/dialog/project-dialog";
import ProjectCard from "@/components/card/card-project";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function IndexManageProject() {
  const { projects, loading, error, deleteProject } = useProjects();
  const navigate = useNavigate();
  const { checkSession } = useAuth();

  // 🔐 Check session on mount
  useEffect(() => {
    const session = checkSession();

    if (!session.isValid) {
      navigate("/login");
    }
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);
      toast.success("Project deleted.");
    } catch (err) {
      toast.error("Failed to delete project.");
    }
  };

  if (loading)
    return <div className="p-6 text-gray-500">Loading projects...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Manage Projects</h1>
          <ProjectDialog triggerText="Create New Project" />
        </div>

        {projects.length === 0 ? (
          <div className="text-center text-muted-foreground text-sm">
            No projects available.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={() => {}}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

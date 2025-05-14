import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/layouts/dashboard-layout";
import ProjectList from "@/components/card/card-project";

export default function ManageProjects() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Manage Projects</h1>
          <Button asChild>
            <Link
              to="/dashboard/manage-projects/create"
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Project
            </Link>
          </Button>
        </div>

        {/* Render komponen card project */}
        <ProjectList />
      </div>
    </DashboardLayout>
  );
}

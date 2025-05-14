import { useProjects } from "@/hooks/useProjects";
import { Link } from "react-router-dom";
import { Link2, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProjectList() {
  const { projects, loading, error } = useProjects();

  if (loading)
    return (
      <p className="text-center mt-10 text-muted-foreground">
        Loading projects...
      </p>
    );
  if (error)
    return <p className="text-center text-red-600">Error: {error.message}</p>;

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">All Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Link
            to={`/dashboard/manage-projects/${project.id}`}
            key={project.id}
            className="relative rounded-xl overflow-hidden shadow-md group transition-transform duration-300 hover:scale-[1.01]"
          >
            {/* Background image */}
            <div className="relative w-full h-64">
              <img
                src={project.image || "https://picsum.photos/400/250"}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary to-white/10 opacity-90 transition-opacity group-hover:opacity-95" />
              {/* Text content */}
              <div className="absolute inset-0 z-10 flex flex-col justify-end p-4 text-white">
                <Link to={`/projects/${project.id}`}>
                  <h3 className="text-lg font-bold mb-1 group-hover:underline">
                    {project.title}
                  </h3>
                </Link>
                <p className="text-sm text-white/80 line-clamp-2">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="absolute top-4 right-4 z-20 flex gap-2">
              <Button
                asChild
                variant="outline"
                size="icon"
                className="bg-white/90 backdrop-blur-sm"
              >
                <Link to={`/dashboard/manage-projects/edit/${project.id}`}>
                  <Pencil className="w-4 h-4 text-primary" />
                </Link>
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="bg-red-800 text-white hover:bg-red-900 backdrop-blur-sm"
                onClick={() =>
                  window.confirm(
                    "Are you sure you want to delete this project?"
                  )
                    ? alert(`Deleting project ${project.id}`)
                    : null
                }
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

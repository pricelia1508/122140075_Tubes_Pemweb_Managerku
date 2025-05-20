// src/components/card/Projects.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ProjectDialog from "@/components/dialog/project-dialog";

const statusStyles = {
  ongoing: "bg-green-800 text-green-100",
  planning: "bg-yellow-800 text-yellow-100",
  finished: "bg-gray-700 text-gray-200",
};

const ProjectCard = ({ project, onEdit, onDelete }) => {
  return (
    <div className="relative group bg-gradient-to-t from-primary to-transparent rounded-xl p-1 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Link untuk klik card */}
      <Link to={`/dashboard/manage-projects/${project.id}`} className="block">
        {/* Inner Card */}
        <div className="bg-primary rounded-lg p-5 h-full flex flex-col justify-between min-h-[220px]">
          {/* Status Badge */}
          <div className="flex justify-between items-start">
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full ${
                statusStyles[project.status]
              }`}
            >
              {project.status.toUpperCase()}
            </span>
          </div>

          {/* Title & Description */}
          <div className="mt-3">
            <h2 className="text-xl font-bold text-white">{project.name}</h2>
            <p className="text-sm text-gray-300 mt-2 line-clamp-2">
              {project.description}
            </p>
          </div>
        </div>
      </Link>

      {/* Tombol Aksi (absolute) */}
      <div className="absolute top-3 right-3 flex gap-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {/* Tombol Edit */}
        <ProjectDialog
          triggerText={
            <Button
              variant="ghost"
              size="icon"
              title="Edit"
              className="text-blue-400 hover:text-blue-300 hover:bg-blue-950/30"
            >
              <Edit size={16} />
            </Button>
          }
          onSubmit={(updatedData) => onEdit({ ...project, ...updatedData })}
          initialData={project}
          isEdit={true}
        />

        {/* Tombol Hapus */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              title="Delete"
              className="text-red-400 hover:text-red-300 hover:bg-red-950/30"
            >
              <Trash2 size={16} />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white dark:bg-gray-900 text-black dark:text-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will delete the project "{project.name}". This action
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="dark:text-gray-300">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => onDelete(project.id)}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ProjectCard;

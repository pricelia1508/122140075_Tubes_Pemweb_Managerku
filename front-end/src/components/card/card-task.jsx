import React from "react";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, CalendarDays, AlignLeft, Tag } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import TaskDialog from "@/components/dialog/task-dialog";

export default function TaskCard({ task, onEdit, onDelete }) {
  const [openEdit, setOpenEdit] = React.useState(false);

  const statusClass =
    task.status === "completed"
      ? "bg-green-100 text-green-800"
      : task.status === "in progress"
      ? "bg-blue-100 text-blue-800"
      : task.status === "blocked"
      ? "bg-red-100 text-red-700"
      : task.status === "not started"
      ? "bg-yellow-100 text-yellow-800"
      : task.status === "pending"
      ? "bg-orange-100 text-orange-800"
      : task.status === "finished"
      ? "bg-purple-100 text-purple-800"
      : task.status === "todo"
      ? "bg-gray-100 text-gray-700"
      : "bg-gray-100 text-gray-700"; // Default fallback for any unknown status

  return (
    <div className="relative group bg-white dark:bg-white p-5 rounded-lg border border-gray-200 hover:shadow-md transition">
      {/* Title */}
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{task.name}</h3>

        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {/* Edit Task */}
          <TaskDialog
            triggerText={
              <Button
                variant="ghost"
                size="icon"
                className="text-blue-700 hover:text-blue-900 hover:bg-blue-100"
              >
                <Edit size={16} />
              </Button>
            }
            open={openEdit}
            onOpenChange={setOpenEdit}
            onSubmit={(updatedTask) => onEdit({ ...task, ...updatedTask })}
            initialData={task}
            isEdit={true}
            projectId={task.project_id}
          />

          {/* Delete Task */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-red-600 hover:text-red-800 hover:bg-red-100"
              >
                <Trash2 size={16} />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white text-gray-900 border border-gray-200">
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Task</AlertDialogTitle>
                <AlertDialogDescription className="text-gray-500">
                  This will permanently delete the task "{task.name}".
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-gray-100 text-gray-800 hover:bg-gray-200">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDelete(task.id)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mt-1 flex items-start gap-2">
        <AlignLeft size={14} className="mt-[2px]" />
        {task.description}
      </p>

      {/* Metadata */}
      <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-600">
        <div
          className={`flex items-center gap-1 px-2 py-1 rounded ${statusClass}`}
        >
          <Tag size={12} />
          <span className="capitalize">{task.status}</span>
        </div>
        <div className="flex items-center gap-1">
          <CalendarDays size={12} />
          {task.start_date} → {task.ends_date}
        </div>
      </div>
    </div>
  );
}

TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    start_date: PropTypes.string.isRequired,
    ends_date: PropTypes.string.isRequired,
    project_id: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

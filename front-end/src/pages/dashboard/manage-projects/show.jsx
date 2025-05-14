import { useState } from "react";
import { useParams } from "react-router-dom";
import { useProjectsWithTasks } from "@/hooks/useProjectsWithTasks";
import DashboardLayout from "@/layouts/dashboard-layout";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  useDroppable,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2 } from "lucide-react";

// Task Card
function TaskItem({ task, onEdit, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="border border-muted rounded-md px-4 py-3 bg-white shadow-sm"
    >
      <div className="flex justify-between items-center gap-4">
        <div>
          <p className="text-sm font-medium text-gray-800">{task.name}</p>
          <p className="text-xs text-muted-foreground capitalize">
            {task.status.replace("_", " ")} • {task.priority}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(task)}
            className="text-muted-foreground hover:text-primary"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-muted-foreground hover:text-red-500"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </li>
  );
}

// Droppable wrapper
function DroppableZone({ id, children }) {
  const { setNodeRef } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className="space-y-3 min-h-[40px]">
      {children}
    </div>
  );
}

export default function ProjectDetailWithTasks() {
  const { id } = useParams();
  const { projects, loading, error } = useProjectsWithTasks();

  const [openDialog, setOpenDialog] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [editId, setEditId] = useState(null);
  const [addedTasks, setAddedTasks] = useState([]);

  const project = projects.find((p) => p.id === parseInt(id));
  const baseTasks = project?.tasks || [];
  const allTasks = [...baseTasks, ...addedTasks];

  const todoTasks = allTasks.filter((t) => t.status !== "done");
  const doneTasks = allTasks.filter((t) => t.status === "done");

  const sensors = useSensors(useSensor(PointerSensor));

  const handleAddOrUpdate = () => {
    if (!taskName.trim()) return;
    if (editId) {
      setAddedTasks((prev) =>
        prev.map((t) => (t.id === editId ? { ...t, name: taskName } : t))
      );
    } else {
      const newTask = {
        id: Date.now(),
        name: taskName,
        description: "Tugas manual",
        priority: "medium",
        status: "todo",
        assigned_to: null,
      };
      setAddedTasks((prev) => [...prev, newTask]);
    }
    setTaskName("");
    setEditId(null);
    setOpenDialog(false);
  };

  const handleDelete = (id) =>
    setAddedTasks((prev) => prev.filter((t) => t.id !== id));

  const handleEdit = (task) => {
    setTaskName(task.name);
    setEditId(task.id);
    setOpenDialog(true);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeTask = allTasks.find((t) => t.id === active.id);
    const newStatus = over.id;

    if (!activeTask || activeTask.status === newStatus) return;

    setAddedTasks((prev) =>
      prev.map((t) => (t.id === active.id ? { ...t, status: newStatus } : t))
    );
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error.message}</div>;
  if (!project) return <div className="p-6">Project not found</div>;

  return (
    <DashboardLayout>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Project Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            {project.name}
          </h1>
          <p className="text-muted-foreground">{project.description}</p>
          <span className="inline-block mt-2 bg-primary text-white text-sm px-3 py-1 rounded-full capitalize">
            {project.status.replace("_", " ")}
          </span>
        </div>

        {/* Add Task */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Tasks</h2>
          <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
            <AlertDialogTrigger asChild>
              <Button size="sm">{editId ? "Edit Task" : "Add Task"}</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {editId ? "Edit Task" : "Add New Task"}
                </AlertDialogTitle>
              </AlertDialogHeader>
              <div className="grid gap-4 py-2">
                <Label htmlFor="task">Task Title</Label>
                <Input
                  id="task"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                />
              </div>
              <AlertDialogFooter>
                <Button variant="outline" onClick={() => setOpenDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddOrUpdate}>
                  {editId ? "Save" : "Add"}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {/* Task Columns */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="grid md:grid-cols-2 gap-6">
            {/* TODO + IN PROGRESS */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                Belum Selesai
              </h3>
              <DroppableZone id="todo">
                <SortableContext
                  items={todoTasks.map((t) => t.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <ul className="space-y-3">
                    {todoTasks.map((task) => (
                      <TaskItem
                        key={task.id}
                        task={task}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
                    ))}
                  </ul>
                </SortableContext>
              </DroppableZone>
            </div>

            {/* DONE */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                Selesai
              </h3>
              <DroppableZone id="done">
                <SortableContext
                  items={doneTasks.map((t) => t.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <ul className="space-y-3">
                    {doneTasks.map((task) => (
                      <TaskItem
                        key={task.id}
                        task={task}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
                    ))}
                  </ul>
                </SortableContext>
              </DroppableZone>
            </div>
          </div>
        </DndContext>
      </div>
    </DashboardLayout>
  );
}

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProjects } from "@/hooks/useProjects";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import DashboardLayout from "@/layouts/dashboard-layout";

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, loading, error } = useProjects();

  const [form, setForm] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const found = projects.find((p) => p.id === parseInt(id));
    if (found) {
      setForm({ ...found });
    }
  }, [projects, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulasi update
    setTimeout(() => {
      console.log("Updated Project:", form);
      setSubmitting(false);
      navigate("/dashboard/manage-projects");
    }, 1000);
  };

  if (loading || !form) {
    return (
      <div className="text-center mt-10 text-muted-foreground">
        Loading project...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 mt-10 text-center">
        Error: {error.message}
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Project</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 text-sm"
            >
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="on-hold">On Hold</option>
            </select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              name="image"
              value={form.image}
              onChange={handleChange}
              required
            />
          </div>

          <Button type="submit" disabled={submitting} className="w-full mt-4">
            {submitting ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </div>
    </DashboardLayout>
  );
}

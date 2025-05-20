import { Link, useNavigate } from "react-router-dom";
import TextLink from "@/components/text-link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/layouts/auth-layout";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Register() {
  const { register, error: authError } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError(null);

    if (data.password !== data.password_confirmation) {
      const msg = "Passwords do not match";
      toast.error(msg);
      setError(msg);
      setProcessing(false);
      return;
    }

    try {
      const { username, email, password } = data;
      const success = await register(username, email, password);

      if (!success) {
        const errMsg = authError || "Registration failed. Please try again.";
        toast.error(errMsg);
        setError(errMsg);
        setProcessing(false);
        return;
      }

      toast.success("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      const fallback = "Registration error occurred.";
      const message = err?.message || fallback;
      toast.error(message);
      setError(message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <AuthLayout
      title="Create an account"
      description="Enter your details below to create your account"
    >
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="grid gap-4">
          {/* Username */}
          <div className="grid gap-1">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              name="username"
              required
              autoFocus
              autoComplete="name"
              value={data.username}
              onChange={handleChange}
              disabled={processing}
              placeholder="Full name"
            />
          </div>

          {/* Email */}
          <div className="grid gap-1">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              name="email"
              required
              autoComplete="email"
              value={data.email}
              onChange={handleChange}
              disabled={processing}
              placeholder="email@example.com"
            />
          </div>

          {/* Password */}
          <div className="grid gap-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              required
              autoComplete="new-password"
              value={data.password}
              onChange={handleChange}
              disabled={processing}
              placeholder="Password"
            />
          </div>

          {/* Confirm Password */}
          <div className="grid gap-1">
            <Label htmlFor="password_confirmation">Confirm password</Label>
            <Input
              id="password_confirmation"
              type="password"
              name="password_confirmation"
              required
              autoComplete="new-password"
              value={data.password_confirmation}
              onChange={handleChange}
              disabled={processing}
              placeholder="Confirm password"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-sm text-red-500">{error}</p>}

          {/* Submit Button */}
          <Button type="submit" className="mt-2 w-full" disabled={processing}>
            {processing && (
              <span className="animate-spin mr-2">
                <Loader2 className="h-4 w-4" />
              </span>
            )}
            Create account
          </Button>
        </div>

        {/* Login Link */}
        <div className="text-muted-foreground text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" tabIndex={6}>
            Log in
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}

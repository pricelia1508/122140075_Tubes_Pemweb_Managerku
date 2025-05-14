import { Link } from "react-router-dom";
import TextLink from "@/components/text-link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/layouts/auth-layout";
import { useState } from "react";

export default function Register() {
  // Dummy data state
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [processing, setProcessing] = useState(false);

  // Dummy error handling
  const errors = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);

    // Simulasi proses submit
    setTimeout(() => {
      console.log("Form submitted:", data);
      setProcessing(false);
      // Di sini Anda bisa tambahkan logika API call
    }, 1000);
  };

  return (
    <AuthLayout
      title="Create an account"
      description="Enter your details below to create your account"
    >
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="grid gap-4">
          {/* Name */}
          <div className="grid gap-1">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              name="name"
              required
              autoFocus
              tabIndex={1}
              autoComplete="name"
              value={data.name}
              onChange={handleChange}
              disabled={processing}
              placeholder="Full name"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="grid gap-1">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              name="email"
              required
              tabIndex={2}
              autoComplete="email"
              value={data.email}
              onChange={handleChange}
              disabled={processing}
              placeholder="email@example.com"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="grid gap-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              required
              tabIndex={3}
              autoComplete="new-password"
              value={data.password}
              onChange={handleChange}
              disabled={processing}
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="grid gap-1">
            <Label htmlFor="password_confirmation">Confirm password</Label>
            <Input
              id="password_confirmation"
              type="password"
              name="password_confirmation"
              required
              tabIndex={4}
              autoComplete="new-password"
              value={data.password_confirmation}
              onChange={handleChange}
              disabled={processing}
              placeholder="Confirm password"
            />
            {errors.password_confirmation && (
              <p className="text-sm text-red-500">
                {errors.password_confirmation}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="mt-2 w-full"
            tabIndex={5}
            disabled={processing}
          >
            {processing && <span className="animate-spin mr-2">🔄</span>}
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

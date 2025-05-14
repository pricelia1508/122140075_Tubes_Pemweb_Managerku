import { LoaderCircle } from "lucide-react";

import TextLink from "@/components/text-link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/layouts/auth-layout";
import { Link } from "react-router-dom";

export default function Login({ status, canResetPassword }) {
  // Kosongkan handling form untuk saat ini
  const submit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <AuthLayout
      title="Log in to your account"
      description="Enter your email and password below to log in"
    >
      <form className="flex flex-col gap-6" onSubmit={submit}>
        <div className="grid gap-4">
          <div className="grid gap-1">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              required
              autoFocus
              tabIndex={1}
              autoComplete="email"
              // value={data.email} // Uncomment when form logic is added
              // onChange={(e) => setData('email', e.target.value)} // Uncomment when form logic is added
              placeholder="email@example.com"
            />
            {/* <InputError message=errors.email /> */}
          </div>

          <div className="grid gap-1">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              {canResetPassword && (
                <TextLink
                  href={route("password.request")}
                  className="ml-auto text-sm"
                  tabIndex={5}
                >
                  Forgot password?
                </TextLink>
              )}
            </div>
            <Input
              id="password"
              type="password"
              required
              tabIndex={2}
              autoComplete="current-password"
              // value={data.password} // Uncomment when form logic is added
              // onChange={(e) => setData('password', e.target.value)} // Uncomment when form logic is added
              placeholder="Password"
            />
            {/* <InputError message=errors.password /> */}
          </div>

          <div className="flex items-center space-x-3">
            <Checkbox
              id="remember"
              name="remember"
              // checked={data.remember} // Uncomment when form logic is added
              // onClick={() => setData('remember', !data.remember)} // Uncomment when form logic is added
              tabIndex={3}
            />
            <Label htmlFor="remember">Remember me</Label>
          </div>

          <Button
            type="submit"
            className="mt-4 w-full"
            tabIndex={4}
            disabled={false}
          >
            {/* processing && <LoaderCircle className="h-4 w-4 animate-spin" /> */}
            Log in
          </Button>
        </div>

        {/* Register Link */}
        <div className="text-muted-foreground text-center text-sm">
          Don't have an account?{" "}
          <Link to="/register" tabIndex={6}>
            Create an account
          </Link>
        </div>
      </form>

      {status && (
        <div className="mb-4 text-center text-sm font-medium text-green-600">
          {status}
        </div>
      )}
    </AuthLayout>
  );
}

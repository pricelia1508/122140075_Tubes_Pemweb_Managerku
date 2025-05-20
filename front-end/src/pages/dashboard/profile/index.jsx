import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import DashboardLayout from "@/layouts/dashboard-layout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
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

export default function IndexProfile() {
  const { checkSession, logout } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  // 🔐 Check session on mount
  useEffect(() => {
    const session = checkSession();
    if (!session.isValid) {
      navigate("/login");
    } else {
      setUser(session.user);
    }
    setChecking(false);
  }, []);

  if (checking || !user) {
    return (
      <DashboardLayout>
        <div className="p-6">Loading profile...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">My Profile</h1>

        <Card>
          <CardHeader className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarFallback>
                {user.username?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>

            <div>
              <CardTitle>{user.username}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </div>
          </CardHeader>

          <Separator />

          <CardContent className="pt-4 text-sm text-muted-foreground">
            <p>
              Your password is stored securely (hashed). For account settings,
              please contact the admin.
            </p>
          </CardContent>

          <CardFooter className="flex justify-end">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full sm:w-auto">
                  <LogOutIcon className="mr-2" />
                  Logout
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-white dark:bg-gray-900">
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to log out? You will need to log in
                    again to access your account.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={logout}>Logout</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
}

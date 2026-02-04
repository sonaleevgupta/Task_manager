import { Outlet } from "react-router-dom";
import { DashboardSidebar, DashboardHeader } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ListTodo, Clock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main area */}
      <div className="flex flex-1 flex-col">
        <DashboardHeader />

        <main className="flex-1 space-y-6 overflow-auto p-6">
          {/* Welcome */}
          <div>
            <h1 className="text-2xl font-bold">
              Welcome back{user?.name ? `, ${user.name}` : ""} 👋
            </h1>
            <p className="text-muted-foreground">
              Manage your tasks and stay productive
            </p>
          </div>

          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="transition hover:shadow-md hover:scale-[1.01]">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Tasks
                </CardTitle>
                <ListTodo className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">—</div>
                <p className="text-xs text-muted-foreground">
                  All your tasks
                </p>
              </CardContent>
            </Card>

            <Card className="transition hover:shadow-md hover:scale-[1.01]">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Completed
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">—</div>
                <p className="text-xs text-muted-foreground">
                  Finished tasks
                </p>
              </CardContent>
            </Card>

            <Card className="transition hover:shadow-md hover:scale-[1.01]">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending
                </CardTitle>
                <Clock className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">—</div>
                <p className="text-xs text-muted-foreground">
                  Tasks to do
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Page Content */}
          <div className="rounded-lg border bg-background p-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

import { useAuth } from "@/context/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Mail, CheckSquare, Clock } from "lucide-react";

export default function Profile() {
  const { user } = useAuth();

  // Temporary mock stats (replace later with API data)
  const taskStats = {
    total: 12,
    completed: 7,
    pending: 5,
  };

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Profile</h2>
        <p className="text-muted-foreground">
          View your account details and activity summary
        </p>
      </div>

      {/* User info */}
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Personal Information
          </CardTitle>
          <CardDescription>Your basic account details</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">
              {user?.name || "Guest User"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {user?.email || "Not available"}
            </span>
          </div>

          <Badge variant="secondary" className="mt-2 w-fit">
            Logged in
          </Badge>
        </CardContent>
      </Card>

      {/* Task / work summary */}
      <div className="grid gap-4 md:grid-cols-3 max-w-2xl">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Tasks</CardDescription>
            <CardTitle className="text-2xl">
              {taskStats.total}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-1">
              <CheckSquare className="h-4 w-4 text-green-500" />
              Completed
            </CardDescription>
            <CardTitle className="text-2xl text-green-600">
              {taskStats.completed}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-orange-500" />
              Pending
            </CardDescription>
            <CardTitle className="text-2xl text-orange-600">
              {taskStats.pending}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Footer note */}
    
    </div>
  );
}

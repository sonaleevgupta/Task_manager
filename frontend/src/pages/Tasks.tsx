import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Search, Pencil, Trash2, CheckSquare, Calendar } from "lucide-react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { tasksApi } from "@/api/tasks";
import { getErrorMessage } from "@/api/client";
import type { Task, TaskFilters } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TaskFormDialog } from "@/components/TaskFormDialog";
import { useToast } from "@/hooks/use-toast";

const statusConfig: Record<string, { label: string; className: string }> = {
  todo: { label: "To Do", className: "bg-status-todo text-status-todo-foreground" },
  "in-progress": { label: "In Progress", className: "bg-status-progress text-status-progress-foreground" },
  done: { label: "Done", className: "bg-status-done text-status-done-foreground" },
};

const priorityConfig: Record<string, { label: string; className: string }> = {
  low: { label: "Low", className: "border-priority-low text-priority-low" },
  medium: { label: "Medium", className: "border-priority-medium text-priority-medium" },
  high: { label: "High", className: "border-priority-high text-priority-high" },
};

export default function Tasks() {
  const [filters, setFilters] = useState<TaskFilters>({ page: 1, limit: 10 });
  const [search, setSearch] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);

  const queryClient = useQueryClient();
  const { toast } = useToast();

  /* ✅ KEEP PREVIOUS DATA TO PREVENT FLICKER */
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["tasks", filters],
    queryFn: () => tasksApi.getAll(filters),
    staleTime: 1000 * 60, // 1 minute cache
  });

  /* ✅ Always safe array */
  const tasks: Task[] = Array.isArray(data) ? data : [];

  const deleteMutation = useMutation({
    mutationFn: tasksApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast({ title: "Task deleted" });
    },
    onError: (err) => {
      toast({
        title: "Error",
        description: getErrorMessage(err),
        variant: "destructive",
      });
    },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold font-heading">Tasks</h2>
          <p className="text-muted-foreground">Manage your tasks</p>
        </div>

        <Button
          onClick={() => setCreateOpen(true)}
          className="rounded-xl gradient-primary text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </div>

      {/* Search */}
      <div className="flex gap-2 max-w-md">
        <Input
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" &&
            setFilters({ ...filters, search, page: 1 })
          }
        />
        <Button
          variant="outline"
          onClick={() =>
            setFilters({ ...filters, search, page: 1 })
          }
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {/* Loading Skeleton */}
      {isLoading && tasks.length === 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-5 space-y-3">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : error ? (
        <Card>
          <CardContent className="p-8 text-center text-destructive">
            {getErrorMessage(error)}
          </CardContent>
        </Card>
      ) : tasks.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <CheckSquare className="mx-auto h-12 w-12 text-muted-foreground/40" />
            <p className="mt-4 text-lg font-medium text-muted-foreground">
              No tasks yet
            </p>
          </CardContent>
        </Card>
      ) : (
        <motion.div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {tasks.map((task) => {
              const status =
              statusConfig[task.status as keyof typeof statusConfig] ||
              statusConfig.todo;

const priority =
  priorityConfig[task.priority as keyof typeof priorityConfig] ||
  priorityConfig.medium;


              return (
                <motion.div key={task.id}>
                  <Card>
                    <CardContent className="p-5">
                      <h3 className="font-semibold">{task.title}</h3>

                      {task.description && (
                        <p className="text-sm text-muted-foreground">
                          {task.description}
                        </p>
                      )}

                      <div className="flex gap-2 mt-3">
                        <Badge className={status.className}>
                          {status.label}
                        </Badge>
                        <Badge variant="outline">
                          {priority.label}
                        </Badge>

                        {task.dueDate && (
                          <span className="ml-auto text-xs flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {format(new Date(task.dueDate), "MMM d")}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}

      <TaskFormDialog
        open={createOpen || !!editTask}
        task={editTask}
        onOpenChange={(open) => {
          if (!open) {
            setCreateOpen(false);
            setEditTask(null);
          }
        }}
      />
    </div>
  );
}

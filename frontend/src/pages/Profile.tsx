import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Mail, CheckSquare, Clock, Shield } from "lucide-react";
import { motion } from "framer-motion";

export default function Profile() {
  const { user } = useAuth();

  const taskStats = { total: 12, completed: 7, pending: 5 };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h2 className="text-3xl font-bold tracking-tight font-heading">Profile</h2>
        <p className="text-muted-foreground">View your account details and activity summary</p>
      </div>

      {/* Profile Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="rounded-2xl overflow-hidden shadow-lg border-border/50">
          {/* Banner */}
          <div className="h-28 gradient-primary relative">
            <div className="absolute -bottom-10 left-6">
              <div className="w-20 h-20 rounded-2xl bg-card border-4 border-card shadow-lg flex items-center justify-center">
                <User className="w-10 h-10 text-primary" />
              </div>
            </div>
          </div>
          <CardContent className="pt-14 pb-6 px-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold font-heading">{user?.name || "Guest User"}</h3>
                <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{user?.email || "Not available"}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge className="rounded-full px-3 py-1 gradient-primary text-white border-0">
                  <Shield className="h-3 w-3 mr-1" />
                  Active
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats */}
      <motion.div
        className="grid gap-4 md:grid-cols-3"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
      >
        {[
          { label: "Total Tasks", value: taskStats.total, icon: CheckSquare, gradient: "gradient-primary", shadow: "shadow-primary/20" },
          { label: "Completed", value: taskStats.completed, icon: CheckSquare, gradient: "bg-status-done", shadow: "shadow-status-done/20" },
          { label: "Pending", value: taskStats.pending, icon: Clock, gradient: "bg-status-todo", shadow: "shadow-status-todo/20" },
        ].map((stat) => (
          <motion.div key={stat.label} variants={{ hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } }}>
            <Card className={`rounded-2xl overflow-hidden border-0 shadow-lg ${stat.shadow} hover:scale-[1.03] transition-transform duration-200 relative`}>
              <div className={`absolute inset-0 ${stat.gradient} opacity-90`} />
              <CardHeader className="relative pb-2">
                <CardDescription className="flex items-center gap-1.5 text-white/80">
                  <stat.icon className="h-4 w-4" />
                  {stat.label}
                </CardDescription>
                <CardTitle className="text-3xl text-white relative">{stat.value}</CardTitle>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

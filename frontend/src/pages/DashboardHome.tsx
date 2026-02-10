import { CheckSquare, Clock, AlertCircle, CheckCircle2, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { tasksApi } from '@/api/tasks';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import type { Task } from '@/types';

const statusColors = {
  todo: 'hsl(45, 93%, 55%)',
  'in-progress': 'hsl(210, 100%, 55%)',
  done: 'hsl(142, 72%, 45%)',
};

function getRecentTasksByDay(tasks: Task[]) {
  const days: Record<string, number> = {};
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const key = d.toLocaleDateString('en-US', { weekday: 'short' });
    days[key] = 0;
  }
  tasks.forEach((t) => {
    const d = new Date(t.created_at);

    const key = d.toLocaleDateString('en-US', { weekday: 'short' });
    if (key in days) days[key]++;
  });
  return Object.entries(days).map(([name, count]) => ({ name, count }));
}

export default function DashboardHome() {
  const { data, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => tasksApi.getAll({ limit: 100 }),
  });

  const tasks: Task[] = Array.isArray(data) ? data : [];


  const stats = {
    total: tasks.length,
    todo: tasks.filter((t) => t.status === 'todo').length,
    inProgress: tasks.filter((t) => t.status === 'in-progress').length,
    done: tasks.filter((t) => t.status === 'done').length,
  };

  const pieData = [
    { name: 'To Do', value: stats.todo, color: statusColors.todo },
    { name: 'In Progress', value: stats.inProgress, color: statusColors['in-progress'] },
    { name: 'Done', value: stats.done, color: statusColors.done },
  ];

  const barData = getRecentTasksByDay(tasks);

  const statCards = [
    { title: 'Total Tasks', value: stats.total, icon: CheckSquare, gradient: 'gradient-primary', shadow: 'shadow-primary/25' },
    { title: 'To Do', value: stats.todo, icon: Clock, gradient: 'bg-status-todo', shadow: 'shadow-status-todo/25' },
    { title: 'In Progress', value: stats.inProgress, icon: AlertCircle, gradient: 'bg-status-progress', shadow: 'shadow-status-progress/25' },
    { title: 'Completed', value: stats.done, icon: CheckCircle2, gradient: 'bg-status-done', shadow: 'shadow-status-done/25' },
  ];

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight font-heading">Dashboard</h2>
        <p className="text-muted-foreground">Overview of your task management</p>
      </div>

      {/* Stat Cards */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <motion.div key={stat.title} variants={item}>
            <Card className={`relative overflow-hidden border-0 shadow-lg ${stat.shadow} hover:scale-[1.03] transition-transform duration-200`}>
              <div className={`absolute inset-0 ${stat.gradient} opacity-90`} />
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/80">{stat.title}</CardTitle>
                <stat.icon className="h-5 w-5 text-white/70" />
              </CardHeader>
              <CardContent className="relative">
                {isLoading ? (
                  <Skeleton className="h-9 w-16 bg-white/20" />
                ) : (
                  <div className="text-3xl font-bold text-white animate-count-up">{stat.value}</div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Pie Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="shadow-lg border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-heading">
                <TrendingUp className="h-5 w-5 text-primary" />
                Task Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-[200px] w-full" />
              ) : stats.total === 0 ? (
                <div className="h-[200px] flex items-center justify-center text-muted-foreground">No tasks yet</div>
              ) : (
                <div className="flex items-center gap-6">
                  <ResponsiveContainer width="50%" height={200}>
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                        {pieData.map((entry, index) => (
                          <Cell key={index} fill={entry.color} stroke="none" />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-3">
                    {pieData.map((entry) => (
                      <div key={entry.name} className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                        <span className="text-sm text-muted-foreground">{entry.name}</span>
                        <span className="text-sm font-bold">{entry.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Bar Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card className="shadow-lg border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-heading">
                <TrendingUp className="h-5 w-5 text-accent" />
                Tasks Created (Last 7 Days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-[200px] w-full" />
              ) : (
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                    <YAxis allowDecimals={false} tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        background: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '12px',
                        fontSize: '13px',
                      }}
                    />
                    <Bar dataKey="count" fill="hsl(262, 83%, 58%)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

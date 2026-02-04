import { useState } from "react";
import { CheckSquare, LayoutDashboard, User, LogOut, Menu } from "lucide-react";

import { NavLink } from "@/components/NavLink";
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/tasks", label: "Tasks", icon: CheckSquare },
  { to: "/profile", label: "Profile", icon: User },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { logout } = useAuth();

  return (
    <div className="flex h-full flex-col">
      <div className="border-b px-4 py-4">
        <h1 className="text-xl font-bold text-primary">TaskManager</h1>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            activeClassName="bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary"
            onClick={onNavigate}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t p-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
          onClick={logout}
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>
      </div>
    </div>
  );
}

/* ---------- DESKTOP SIDEBAR ---------- */
export function DashboardSidebar() {
  return (
    <aside className="hidden w-64 border-r bg-card md:block">
      <SidebarContent />
    </aside>
  );
}

/* ---------- MOBILE SIDEBAR ---------- */
export function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-64 p-0">
        <SidebarContent onNavigate={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}

/* ---------- HEADER ---------- */
export function DashboardHeader() {
  return (
    <header className="flex h-14 items-center justify-between border-b bg-card px-4">
      <div className="flex items-center gap-4">
        <MobileSidebar />
        <span className="hidden text-sm text-muted-foreground md:inline">
          Welcome back 👋
        </span>
      </div>
      <ThemeToggle />
    </header>
  );
}

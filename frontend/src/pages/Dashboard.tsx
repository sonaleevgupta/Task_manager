import { Outlet } from "react-router-dom";
import { DashboardSidebar, DashboardHeader } from "@/components/DashboardLayout";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col">
        <DashboardHeader />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

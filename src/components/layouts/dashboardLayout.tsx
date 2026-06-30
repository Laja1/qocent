import { Outlet } from "react-router-dom";
import { SidebarLayout } from "../shared";
import { SidebarProvider } from "../ui/sidebar";

export const DashboardLayoutWithSidebar = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <SidebarLayout />
        <main className="relative flex min-h-screen min-w-0 flex-1 flex-col bg-[#fafafa]">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

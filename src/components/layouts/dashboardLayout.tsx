import { Outlet } from "react-router-dom";
import { SidebarLayout } from "../shared";
import { SidebarProvider } from "../ui/sidebar";

export const DashboardLayoutWithSidebar = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/40">
        <div>
          <SidebarLayout />
        </div>
        <div className="w-full h-full relative">
          <div className="w-full flex flex-col z-10 min-h-screen">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

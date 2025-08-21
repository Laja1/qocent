import { Outlet } from "react-router-dom";
import { SidebarLayout } from "../shared";
import { SidebarProvider } from "../ui/sidebar";

export const DashboardLayoutWithSidebar = () => {
  return (
    <SidebarProvider>
      <div className="flex flex-row w-full">
        <div className="">
          <SidebarLayout />
        </div>
        <div className="w-full h-full relative">
          <div className="w-full flex flex-col z-10 overflow-y-hidden min-h-screen bg-white dark:bg-black pt-16">
            
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

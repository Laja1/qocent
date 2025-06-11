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
        <div className="w-full flex flex-col">
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
};

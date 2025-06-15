import { Outlet } from "react-router-dom";
import { SidebarProvider } from "../ui/sidebar";

export const DashboardLayoutWithoutSidebar = () => {
  return (
    <SidebarProvider>
      <div className="flex flex-row w-full">
        <div className="w-full flex flex-col">
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
};

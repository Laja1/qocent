import { Outlet } from "react-router-dom";
import { SidebarLayout } from "../shared";
import { SidebarProvider } from "../ui/sidebar";
import { svgLinks } from "@/assets/assetLink";

export const DashboardLayoutWithSidebar = () => {
  return (
    <SidebarProvider>
      <div className="flex flex-row w-full">
        <div className="">
          <SidebarLayout />
        </div>
        <div className="w-full h-full relative">
          <img
            src={svgLinks.grunge}
            className="absolute inset-0 w-full h-full object-cover z-0 opacity-30 pointer-events-none"
            alt="background texture"
          />
          <div className="w-full  flex flex-col z-10  overflow-y-hidden min-h-screen bg-white">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

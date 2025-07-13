import { Outlet } from "react-router-dom";

export const DashboardLayoutWithoutSidebar = () => {
  return (
    <div className="min-h-screen bg-white ">
      <Outlet />
    </div>
  );
};

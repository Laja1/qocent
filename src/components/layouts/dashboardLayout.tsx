import { Outlet } from "react-router-dom";

export const DashboardLayout = () => {
  return (
    <div>
      <div>
        <h1>Dashboard</h1>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

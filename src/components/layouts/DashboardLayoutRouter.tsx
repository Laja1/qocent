import { useLocation } from "react-router-dom";
import { dashboardRoute } from "@/router/route/dashboardRoute";
import { DashboardLayoutWithSidebar } from "@/components/layouts/dashboardLayout";
import { DashboardLayoutWithoutSidebar } from "./DashboardLayoutWithoutSidebar";

export const DashboardLayoutRouter = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const routeMeta = dashboardRoute.find((route) =>
    currentPath.startsWith(route.path)
  )?.metadata;

  const hasSidebar = routeMeta?.hasSidebar;

  const Layout = hasSidebar ? DashboardLayoutWithSidebar : DashboardLayoutWithoutSidebar;

  return <Layout />;
};

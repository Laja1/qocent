import Home from "@/pages/home";
import { Outlet } from "react-router-dom";
import {
  authRoutes,
  dashboardRoutesWithoutSidebar,
  dashboardRoutesWithSidebar,
} from "./routes";
import { DashboardLayoutWithSidebar } from "@/components/layouts/dashboardLayout";
import { DashboardLayoutWithoutSidebar } from "@/components/layouts/dashboardWithSidebarLayout";


export const routeConfig = [
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Outlet />,
    children: [...authRoutes],
  },
  {
    path: "/",
    element: <DashboardLayoutWithSidebar />,
    children: [...dashboardRoutesWithSidebar],
  },
  {
    path: "",
    element: <DashboardLayoutWithoutSidebar />,
    children: [...dashboardRoutesWithoutSidebar],
  },
];

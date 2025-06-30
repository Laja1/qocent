import Home from "@/pages/home";
import { Outlet } from "react-router-dom";
import { DashboardLayoutWithSidebar } from "@/components/layouts/dashboardLayout";
import { authRoute } from "./route/authRoute";
import { dashboardRoute } from "./route/dashboardRoute";

const authRoutesMapped = authRoute.map(route => ({
  path: route.path,
  element: route.component, // ✅ you stored JSX directly
}));

const dashboardRoutesMapped = dashboardRoute.map(route => ({
  path: route.path,
  element: route.component, // ✅ you stored JSX directly
}));

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
    path: "/",
    element: <Outlet />,
    children:authRoutesMapped
  },
  {
    path: "/",
    element: <DashboardLayoutWithSidebar />,
    children: dashboardRoutesMapped
  },
  // {
  //   path: "",
  //   element: <DashboardLayoutWithoutSidebar />,
  //   children: [...dashboardRoutesWithoutSidebar],
  // },
];

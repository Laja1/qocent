import { Outlet } from "react-router-dom";
import { authRoute } from "./route/authRoute";
import { dashboardRoute } from "./route/dashboardRoute";
import { publicRoute } from "./route/publicRoute";
import { ProtectedRoute, PublicOnlyRoute } from "./route/protectedRoute";
import { DashboardLayoutRouter } from "@/components/layouts/DashboardLayoutRouter";
import NotFound from "@/pages/not-found-page";
import Home from "@/pages/home/home";

const publicRoutesMapped = publicRoute.map((route) => ({
  path: route.path,
  element: route.component,
}));

const authRoutesMapped = authRoute.map((route) => ({
  path: route.path,
  element: route.component,
}));

const dashboardRoutesMapped = dashboardRoute.map((route) => ({
  path: route.path,
  element: route.component,
}));

export const routeConfig = [
  {
    path: "/",
    element: (
      // <ProtectedRoute>
      <Outlet />
      // </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      ...publicRoutesMapped,
    ],
  },
  {
    path: "/",
    element: (
      <PublicOnlyRoute>
        <Outlet />
      </PublicOnlyRoute>
    ),
    children: authRoutesMapped,
  },
  {
    path: `/`,
    // path: RouteConstant.dashboard.dashboard.path,
    element: (
      <ProtectedRoute>
        <DashboardLayoutRouter />
      </ProtectedRoute>
    ),
    children: dashboardRoutesMapped,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

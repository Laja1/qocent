import Home from "@/pages/home";
import { Outlet } from "react-router-dom";
import { authRoute } from "./route/authRoute";
import { dashboardRoute } from "./route/dashboardRoute";
import { publicRoute } from "./route/publicRoute";
import { ProtectedRoute } from "./route/protectedRoute";
import { DashboardLayoutRouter } from "@/components/layouts/DashboardLayoutRouter";

const publicRoutesMapped = publicRoute.map(route => ({
  path: route.path,
  element: route.component, 
}));

const authRoutesMapped = authRoute.map(route => ({
  path: route.path,
  element: route.component, 
}));

const dashboardRoutesMapped = dashboardRoute.map(route => ({
  path: route.path,
  element: route.component, 
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
    children:publicRoutesMapped
  },
  {
    path: "/",
    element: <Outlet />,
    children:authRoutesMapped
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <DashboardLayoutRouter />
      </ProtectedRoute>
    ),
    children: dashboardRoutesMapped,
  },
  
  // {
  //   path: "",
  //   element: <DashboardLayoutWithoutSidebar />,
  //   children: [...dashboardRoutesWithoutSidebar],
  // },
];

import Home from "@/pages/home";
import { Outlet } from "react-router-dom";
import { authRoutes, dashboardRoutes } from "./routes";

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
    path: "/dashboard",
    element: <Outlet />,
    children: [...dashboardRoutes],
  },
];

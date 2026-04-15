import { Navigate, Outlet } from "react-router-dom";
import { authRoute } from "./route/authRoute";
import { dashboardRoute } from "./route/dashboardRoute";
import { publicRoute } from "./route/publicRoute";
import { ProtectedRoute, PublicOnlyRoute } from "./route/protectedRoute";
import { DashboardLayoutRouter } from "@/components/layouts/DashboardLayoutRouter";
import NotFound from "@/pages/not-found-page";
import Home from "@/pages/home/home";
import Documentation from "@/pages/home/documentation";
import DocsOverview from "@/pages/home/documentation/pages/DocsOverview";
import DocsTerminologies from "@/pages/home/documentation/pages/DocsTerminologies";
import DocsQuickStart from "@/pages/home/documentation/pages/DocsQuickStart";
import DocsServerSite from "@/pages/home/documentation/pages/DocsServerSite";
import DocsServerHouse from "@/pages/home/documentation/pages/DocsServerHouse";
import DocsServerRoom from "@/pages/home/documentation/pages/DocsServerRoom";
import DocsInvitingAccounts from "@/pages/home/documentation/pages/DocsInvitingAccounts";
import { FEATURE_SERVER_HOUSE_AND_ROOM } from "@/config/productFeatures";

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
    path: "/docs",
    element: <Documentation />,
    children: [
      { index: true, element: <Navigate to="/docs/overview" replace /> },
      { path: "overview", element: <DocsOverview /> },
      { path: "terminologies", element: <DocsTerminologies /> },
      { path: "quick-start", element: <DocsQuickStart /> },
      { path: "server-site", element: <DocsServerSite /> },
      {
        path: "server-house",
        element: FEATURE_SERVER_HOUSE_AND_ROOM ? (
          <DocsServerHouse />
        ) : (
          <Navigate to="/docs/overview" replace />
        ),
      },
      {
        path: "server-room",
        element: FEATURE_SERVER_HOUSE_AND_ROOM ? (
          <DocsServerRoom />
        ) : (
          <Navigate to="/docs/overview" replace />
        ),
      },
      { path: "inviting-accounts", element: <DocsInvitingAccounts /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

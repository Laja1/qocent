import Home from "@/pages/home";
import SignIn from "@/pages/auth/sign-in";
import SignUp from "@/pages/auth/sign-up";
import { Dashboard } from "@/pages/dashboard";
import { ServerRoom } from "@/pages/server-room";
import { Server } from "@/pages/server";


export const generalRoutes = [
  {
    path: "/",
    element: <Home />,
    name: "Home",
  },
];

export const dashboardRoutesWithSidebar = [
  {
    path: "/dashboard",
    element: <Dashboard />,
    name: "Home",
    metadata: { isProtected: true, hasSideBar: true, displayName: "Home" },
  },
  {
    path: "/dashboard/server-room",
    element: <ServerRoom />,
    name: "ServerRoom",
    metadata: {
      isProtected: true,
      hasSideBar: true,
      displayName: "Server Room",
    },
  },
  {
    path: "/dashboard/server/:id",
    element: <Server />,
    name: "Server",
    metadata: {isProtected: true, hasSideBar: true, displayName: "Server"}
  },
];

// export const dashboardRoutesWithoutSidebar = [
//   {
//     path: "/dashboard/server/:id",
//     element: <Server />,
//     name: "Home",
//     metadata: {isProtected: true, hasSideBar: true, displayName: "Server"}
//   },
// ];

export const authRoutes = [
  {
    path: "/auth/sign-in",
    element: <SignIn />,
    name: "SignIn",
  },
  {
    path: "/auth/sign-up",
    element: <SignUp />,
    name: "SignUp",
  },
];

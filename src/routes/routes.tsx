import Home from "@/pages/home";
import SignIn from "@/pages/auth/sign-in";
import SignUp from "@/pages/auth/sign-up";
import { ServerRoom } from "@/pages/server-room";
import { Server } from "@/pages/server";
import { ArchitectureRoom } from "@/pages/architectural-room/architecture";


export const generalRoutes = [
  {
    path: "/",
    element: <Home />,
    name: "Home",
  },
];

export const dashboardRoutesWithSidebar = [
  {
    path: "/dashboard/server-rooms",
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

export const dashboardRoutesWithoutSidebar = [
  {
    path: "/dashboard/architecture/:id",
    element: <ArchitectureRoom />,
    name: "Home",
    metadata: {isProtected: true, hasSideBar: true, displayName: "Server"}
  },
];

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

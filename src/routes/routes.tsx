import Home from "@/pages/home";
import SignIn from "@/pages/auth/sign-in";
import SignUp from "@/pages/auth/sign-up";
import { Server } from "@/pages/server";
import { ArchitectureRoom } from "@/pages/architectural-room/architecture";
import { ServerSites } from "@/pages/server-sites";
import { ServerHouses } from "@/pages/server-houses";
import { ServerRooms } from "@/pages/server-rooms";
import { Resources } from "@/pages/resources";
import { CreateResource } from "@/pages/create-new-resource";
import { Resource } from "@/pages/resource";

export const generalRoutes = [
  {
    path: "/",
    element: <Home />,
    name: "Home",
  },
];

export const dashboardRoutesWithSidebar = [
  {
    path: "/server-sites",
    element: <ServerSites />,
    name: "ServerSite",
    metadata: {
      isProtected: true,
      hasSideBar: true,
      displayName: "Server Site",
    },
  },
  {
    path: "/server-houses",
    element: <ServerHouses />,
    name: "ServerHouses",
    metadata: {
      isProtected: true,
      hasSideBar: true,
      displayName: "Server Houses",
    },
  },
  {
    path: "/server-rooms",
    element: <ServerRooms />,
    name: "ServerRooms",
    metadata: {
      isProtected: true,
      hasSideBar: true,
      displayName: "Server Rooms",
    },
  },
  {
    path: "/resource",
    element: <Resource />,
    name: "ServerRooms",
    metadata: {
      isProtected: true,
      hasSideBar: true,
      displayName: "Server Rooms",
    },
  },
  {
    path: "/resources",
    element: <Resources />,
    name: "Resource",
    metadata: {
      isProtected: true,
      hasSideBar: true,
      displayName: "Resource",
    },
  },
  {
    path: "/create-resource",
    element: <CreateResource />,
    name: "Resources",
    metadata: {
      isProtected: true,
      hasSideBar: true,
      displayName: "Resources",
    },
  },
  {
    path: "/server/:id",
    element: <Server />,
    name: "Server",
    metadata: { isProtected: true, hasSideBar: true, displayName: "Server" },
  },
];

export const dashboardRoutesWithoutSidebar = [
  {
    path: "/architecture/:id",
    element: <ArchitectureRoom />,
    name: "Home",
    metadata: { isProtected: true, hasSideBar: true, displayName: "Server" },
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

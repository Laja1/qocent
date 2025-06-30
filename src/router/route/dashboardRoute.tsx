import { ServerSites } from "@/pages/server-sites";
import { RouteConstant } from "../routes";
import { ServerHouses } from "@/pages/server-houses";
import { ServerRooms } from "@/pages/server-rooms";
import { CreateResource } from "@/pages/create-new-resource";
import { Resource } from "@/pages/resource";
import { Resources } from "@/pages/resources";
import type { RouteType } from "./type";



export const dashboardRoute: RouteType[] = [
  {
    path: RouteConstant.dashboard.serverSite.path,
    name: RouteConstant.dashboard.serverSite.name,
    component: <ServerSites />,
    metadata: { isAuthenticated: true, hasSidebar: true },
  },
  {
    path: RouteConstant.dashboard.serverHouses.path,
    name: RouteConstant.dashboard.serverHouses.name,
    component: <ServerHouses/>,
    metadata: { isAuthenticated: true, hasSidebar: true },
  },
  {
    path: RouteConstant.dashboard.serverRooms.path,
    name: RouteConstant.dashboard.serverRooms.name,
    component: <ServerRooms />,
    metadata: { isAuthenticated: true, hasSidebar: true },
  },

  {
    path: RouteConstant.dashboard.createResources.path,
    name: RouteConstant.dashboard.createResources.name,
    component: <CreateResource />,
    metadata: { isAuthenticated: true, hasSidebar: true },
  },
  {
      path: RouteConstant.dashboard.resource.path,
      name: RouteConstant.dashboard.resource.name,
      component: <Resource />,
      metadata: { isAuthenticated: true, hasSidebar: true },
  },
  {
    path: RouteConstant.dashboard.resources.path,
    name: RouteConstant.dashboard.resources.name,
    component: <Resources />,
    metadata: { isAuthenticated: true, hasSidebar: true },
  },
  {
    path: RouteConstant.dashboard.serverId.path,
    name: RouteConstant.dashboard.serverId.name,
    component: <Resources />,
    metadata: { isAuthenticated: true, hasSidebar: true },
  },

  
];

import { ServerSites } from "@/pages/server-sites";
import { RouteConstant } from "../routes";
import { ServerHouses } from "@/pages/server-houses";
import { ServerRooms } from "@/pages/server-rooms";
import { Resource } from "@/pages/resource";
import { Resources } from "@/pages/resources";
import type { RouteType } from "./type";
import { CreateNewSite } from "@/pages/create-new-site";
import { CreateNewResource } from "@/pages/create-new-resource";



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
    component: <CreateNewResource />,
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

  {
    path: RouteConstant.dashboard.createnewsite.path,
    name: RouteConstant.dashboard.createnewsite.name,
    component: <CreateNewSite />,
    metadata: { isAuthenticated: true, hasSidebar: true },
  },
]; 

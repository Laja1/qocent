import { ServerSites } from "@/pages/server-sites";
import { RouteConstant } from "../routes";
import { ServerHouses } from "@/pages/server-houses";
import { ServerRooms } from "@/pages/server-rooms";
import { Resource } from "@/pages/resource";
import { Resources } from "@/pages/resources";
import type { RouteType } from "./type";
import { CreateNewSite } from "@/pages/create-new-site";
import { CreateNewResource } from "@/pages/create-new-resource";
import { CreateNewHouse } from "@/pages/create-new-house";
import { CreateNewRoom } from "@/pages/create-new-room";
import { Settings } from "@/pages/settings";
import { Organizations } from "@/pages/organization";
import { Billings } from "@/pages/billings";
import { Console } from "@/pages/console";
import AcceptInvite from "@/pages/accept-invite";
import { UpdateResources } from "@/pages/update-resource";
import { Monitoring } from "@/pages/monitoring";
import StarterPacksGrid from "@/pages/starter-packs";
import { Security } from "@/pages/security";
import { CertificateManager } from "@/pages/security/certificate-manager";
import { Access } from "@/pages/access";

export const dashboardRoute: RouteType[] = [
  {
    path: RouteConstant.dashboard.serverSite.path,
    name: RouteConstant.dashboard.serverSite.name,
    component: <ServerSites />,
    metadata: { isAuthenticated: true, hasSidebar: true },
  },
  {
    path: RouteConstant.dashboard.certificateManager.path,
    name: RouteConstant.dashboard.certificateManager.name,
    component: <CertificateManager />,
    metadata: { isAuthenticated: true, hasSidebar: true },
  },
  {
    path: RouteConstant.dashboard.serverHouses.path,
    name: RouteConstant.dashboard.serverHouses.name,
    component: <ServerHouses />,
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
    path: RouteConstant.dashboard.monitoring.path,
    name: RouteConstant.dashboard.monitoring.name,
    component: <Monitoring />,
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
    path: RouteConstant.dashboard.console.path,
    name: RouteConstant.dashboard.console.name,
    component: <Console />,
    metadata: { isAuthenticated: true, hasSidebar: false },
  },
  {
    path: RouteConstant.dashboard.acceptInvite.path,
    name: RouteConstant.dashboard.acceptInvite.name,
    component: <AcceptInvite />,
    metadata: { isAuthenticated: true, hasSidebar: false },
  },
  {
    path: RouteConstant.dashboard.createnewsite.path,
    name: RouteConstant.dashboard.createnewsite.name,
    component: <CreateNewSite />,
    metadata: { isAuthenticated: true, hasSidebar: true },
  },
  {
    path: RouteConstant.dashboard.starterPacks.path,
    name: RouteConstant.dashboard.starterPacks.name,
    component: <StarterPacksGrid />,
    metadata: { isAuthenticated: true, hasSidebar: true },
  },
  {
    path: RouteConstant.dashboard.createnewhouse.path,
    name: RouteConstant.dashboard.createnewhouse.name,
    component: <CreateNewHouse />,
    metadata: { isAuthenticated: true, hasSidebar: true },
  },
  {
    path: RouteConstant.dashboard.createnewroom.path,
    name: RouteConstant.dashboard.createnewroom.name,
    component: <CreateNewRoom />,
    metadata: { isAuthenticated: true, hasSidebar: true },
  },
  {
    path: RouteConstant.dashboard.settings.path,
    name: RouteConstant.dashboard.settings.name,
    component: <Settings />,
    metadata: { isAuthenticated: true, hasSidebar: true },
  },
  {
    path: RouteConstant.dashboard.organizations.path,
    name: RouteConstant.dashboard.organizations.name,
    component: <Organizations />,
    metadata: { isAuthenticated: true, hasSidebar: true },
  },
  {
    path: RouteConstant.dashboard.security.path,
    name: RouteConstant.dashboard.security.name,
    component: <Security />,
    metadata: { isAuthenticated: true, hasSidebar: true },
  },
  {
    path: RouteConstant.dashboard.access.path,
    name: RouteConstant.dashboard.access.name,
    component: <Access />,
    metadata: { isAuthenticated: true, hasSidebar: true },
  },
  {
    path: RouteConstant.dashboard.billings.path,
    name: RouteConstant.dashboard.billings.name,
    component: <Billings />,
    metadata: { isAuthenticated: true, hasSidebar: true },
  },

  {
    path: RouteConstant.dashboard.updateResources.path,
    name: RouteConstant.dashboard.updateResources.name,
    component: <UpdateResources />,
    metadata: { isAuthenticated: true, hasSidebar: true },
  },
];

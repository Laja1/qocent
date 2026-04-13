import { ServerSites } from "@/pages/server-sites";
import { RouteConstant } from "../routes";
import { ServerHouses } from "@/pages/server-houses";
import { ServerRooms } from "@/pages/server-rooms";
import { Resources } from "@/pages/resources";
import type { RouteType } from "./type";
import { CreateNewSite } from "@/pages/create-new-site";
import { CreateNewResource } from "@/pages/create-new-resource";
import { CreateNewHouse } from "@/pages/create-new-house";
import { CreateNewRoom } from "@/pages/create-new-room";
import { FEATURE_SERVER_HOUSE_AND_ROOM } from "@/config/productFeatures";
import { Settings } from "@/pages/settings";
import { Organizations } from "@/pages/organization";
import { Billings } from "@/pages/billings";
import { Console } from "@/pages/console";
import AcceptInvite from "@/pages/accept-invite";
import StarterPacksGrid from "@/pages/starter-packs";
import { Access } from "@/pages/access";
import { ProfessionalServices } from "@/pages/professional-services";
import { CreateProfessionalService } from "@/pages/create-professional-service";
import DashboardFinops from "@/pages/finops";
import SubscriptionCards from "@/pages/subscription/page";

const serverHouseAndRoomRoutes: RouteType[] = FEATURE_SERVER_HOUSE_AND_ROOM
  ? [
      {
        path: RouteConstant.dashboard.serverHouses.path,
        name: RouteConstant.dashboard.serverHouses.name,
        component: <ServerHouses />,
        metadata: { isAuthenticated: false, hasSidebar: true },
      },
      {
        path: RouteConstant.dashboard.serverRooms.path,
        name: RouteConstant.dashboard.serverRooms.name,
        component: <ServerRooms />,
        metadata: { isAuthenticated: false, hasSidebar: true },
      },
      {
        path: RouteConstant.dashboard.createnewhouse.path,
        name: RouteConstant.dashboard.createnewhouse.name,
        component: <CreateNewHouse />,
        metadata: { isAuthenticated: false, hasSidebar: true },
      },
      {
        path: RouteConstant.dashboard.createnewroom.path,
        name: RouteConstant.dashboard.createnewroom.name,
        component: <CreateNewRoom />,
        metadata: { isAuthenticated: false, hasSidebar: true },
      },
    ]
  : [];

export const dashboardRoute: RouteType[] = [
  {
    path: RouteConstant.dashboard.serverSite.path,
    name: RouteConstant.dashboard.serverSite.name,
    component: <ServerSites />,
    metadata: { isAuthenticated: false, hasSidebar: true },
  },
  {
    path: RouteConstant.dashboard.subscription.path,
    name: RouteConstant.dashboard.subscription.name,
    component: <SubscriptionCards />,
    metadata: { isAuthenticated: false, hasSidebar: true },
  },
  {
    path: RouteConstant.dashboard.finops.path,
    name: RouteConstant.dashboard.finops.name,
    component: <DashboardFinops />,
    metadata: { isAuthenticated: false, hasSidebar: true },
  },

  ...serverHouseAndRoomRoutes,

  {
    path: RouteConstant.dashboard.createResources.path,
    name: RouteConstant.dashboard.createResources.name,
    component: <CreateNewResource />,
    metadata: { isAuthenticated: false, hasSidebar: true },
  },
  {
    path: RouteConstant.dashboard.professionalServices.path,
    name: RouteConstant.dashboard.professionalServices.name,
    component: <ProfessionalServices />,
    metadata: { isAuthenticated: false, hasSidebar: true },
  },
  {
    path: RouteConstant.dashboard.resources.path,
    name: RouteConstant.dashboard.resources.name,
    component: <Resources />,
    metadata: { isAuthenticated: false, hasSidebar: true },
  },
  {
    path: RouteConstant.dashboard.console.path,
    name: RouteConstant.dashboard.console.name,
    component: <Console />,
    metadata: { isAuthenticated: false, hasSidebar: false },
  },
  {
    path: RouteConstant.dashboard.acceptInvite.path,
    name: RouteConstant.dashboard.acceptInvite.name,
    component: <AcceptInvite />,
    metadata: { isAuthenticated: false, hasSidebar: false },
  },
  {
    path: RouteConstant.dashboard.createnewsite.path,
    name: RouteConstant.dashboard.createnewsite.name,
    component: <CreateNewSite />,
    metadata: { isAuthenticated: false, hasSidebar: true },
  },
  {
    path: RouteConstant.dashboard.starterPacks.path,
    name: RouteConstant.dashboard.starterPacks.name,
    component: <StarterPacksGrid />,
    metadata: { isAuthenticated: false, hasSidebar: true },
  },
  {
    path: RouteConstant.dashboard.settings.path,
    name: RouteConstant.dashboard.settings.name,
    component: <Settings />,
    metadata: { isAuthenticated: false, hasSidebar: true },
  },
  {
    path: RouteConstant.dashboard.organizations.path,
    name: RouteConstant.dashboard.organizations.name,
    component: <Organizations />,
    metadata: { isAuthenticated: false, hasSidebar: true },
  },
  {
    path: RouteConstant.dashboard.createProfessionalService.path,
    name: RouteConstant.dashboard.createProfessionalService.name,
    component: <CreateProfessionalService />,
    metadata: { isAuthenticated: false, hasSidebar: true },
  },
  {
    path: RouteConstant.dashboard.access.path,
    name: RouteConstant.dashboard.access.name,
    component: <Access />,
    metadata: { isAuthenticated: false, hasSidebar: true },
  },
  {
    path: RouteConstant.dashboard.billings.path,
    name: RouteConstant.dashboard.billings.name,
    component: <Billings />,
    metadata: { isAuthenticated: false, hasSidebar: true },
  },
];

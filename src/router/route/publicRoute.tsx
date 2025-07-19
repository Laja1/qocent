import Home from "@/pages/home";
import { RouteConstant } from "../routes";
import type { RouteType } from "./type";
import ExploreServices from "@/pages/home/explore-services";
import Documentation from "@/pages/home/documentation";

export const publicRoute: RouteType[] = [
  {
    path: RouteConstant.public.home.path,
    name: RouteConstant.public.home.name,
    component: <Home />,
    metadata: { isAuthenticated: false },
  },
  {
    path: RouteConstant.public.explore.path,
    name: RouteConstant.public.explore.name,
    component: <ExploreServices />,
    metadata: { isAuthenticated: false },
  },
  {
    path: RouteConstant.public.documentation.path,
    name: RouteConstant.public.documentation.name,
    component: <Documentation />,
    metadata: { isAuthenticated: false },
  },
];

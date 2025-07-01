import Home from "@/pages/home";
import { RouteConstant } from "../routes";
import type { RouteType } from "./type";
import { Landing } from "@/pages/home/landing";

export const publicRoute: RouteType[] = [
  {
    path: RouteConstant.public.home.path,
    name: RouteConstant.public.home.name,
    component: <Home />,
    metadata: { isAuthenticated: false },
  },
  {
    path: RouteConstant.public.landing.path,
    name: RouteConstant.public.landing.name,
    component: <Landing />,
    metadata: { isAuthenticated: false },
  },
];

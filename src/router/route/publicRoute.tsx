import Home from "@/pages/home";
import { RouteConstant } from "../routes";
import type { RouteType } from "./type";

export const publicRoute: RouteType[] = [
  {
    path: RouteConstant.public.home.path,
    name: RouteConstant.public.home.name,
    component: <Home />,
    metadata: { isAuthenticated: false },
  },
];

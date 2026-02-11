import AboutUs from "@/pages/home/about-us";
import Documentation from "@/pages/home/documentation";
import ExploreServices from "@/pages/home/explore-services";
import Finops from "@/pages/home/finops";
import Home from "@/pages/home/home";
import Partners from "@/pages/home/our-partners";
import { RouteConstant } from "../routes";
import type { RouteType } from "./type";

export const publicRoute: RouteType[] = [
  {
    path: RouteConstant.public.home.path,
    name: RouteConstant.public.home.name,
    component: <Home />,
    metadata: { isAuthenticated: false },
  },
  {
    path: RouteConstant.public.finops.path,
    name: RouteConstant.public.finops.name,
    component: <Finops />,
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
  {
    path: RouteConstant.public.aboutUs.path,
    name: RouteConstant.public.aboutUs.name,
    component: <AboutUs />,
    metadata: { isAuthenticated: false },
  },
  {
    path: RouteConstant.public.partners.path,
    name: RouteConstant.public.partners.name,
    component: <Partners />,
    metadata: { isAuthenticated: false },
  },

];

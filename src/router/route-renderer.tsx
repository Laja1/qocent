import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routeConfig } from "./route-config";

export const RouteRenderer = () => {
  const routes = createBrowserRouter(routeConfig);
  return <RouterProvider router={routes} />;
};

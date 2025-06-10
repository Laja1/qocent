import Home from "@/pages/home";
import SignIn from "@/pages/auth/sign-in";
import SignUp from "@/pages/auth/sign-up";
import { Dashboard } from "@/pages/dashboard";

export const generalRoutes = [
  {
    path: "/",
    element: <Home />,
    name: "Home",
  },
];

export const dashboardRoutes = [
  {
    path: "/dashboard",
    element: <Dashboard />,
    name: "Home",
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

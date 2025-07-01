import { RouteConstant } from "../routes";
import type { RouteType } from "./type";
import SignIn from "@/pages/auth/sign-in";
import SignUp from "@/pages/auth/sign-up";

export const authRoute: RouteType[] = [
  {
    path: RouteConstant.auth.signin.path,
    name: RouteConstant.auth.signin.name,
    // component: LoginPage,
    component: <SignIn />,
    metadata: { isAuthenticated: false },
  },

  {
    path: RouteConstant.auth.signup.path,
    name: RouteConstant.auth.signup.name,
    component: <SignUp />,
    metadata: { isAuthenticated: false },
  },
  {
    path: RouteConstant.auth.reset.path,
    name: RouteConstant.auth.reset.name,
    component: <SignUp />,
    metadata: { isAuthenticated: false },
  },
  {
    path: RouteConstant.auth.otp.path,
    name: RouteConstant.auth.otp.name,
    component: <SignUp />,
    metadata: { isAuthenticated: false },
  },
  {
    path: RouteConstant.auth.invite.path,
    name: RouteConstant.auth.invite.name,
    component: <SignUp />,
    metadata: { isAuthenticated: false },
  },
];

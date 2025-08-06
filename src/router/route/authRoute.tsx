import ForgotPassword from "@/pages/auth/forgot-password";
import { RouteConstant } from "../routes";
import type { RouteType } from "./type";
import SignIn from "@/pages/auth/sign-in";
import SignUp from "@/pages/auth/sign-up";
import ConfirmAccount from "@/pages/auth/confirm-account";
import CompletePasswordReset from "@/pages/auth/complete-password-reset";

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
    path: RouteConstant.auth.forgotPassword.path,
    name: RouteConstant.auth.forgotPassword.name,
    component: <ForgotPassword />,
    metadata: { isAuthenticated: false },
  },
  {
    path: RouteConstant.auth.otp.path,
    name: RouteConstant.auth.otp.name,
    component: <ConfirmAccount />,
    metadata: { isAuthenticated: false },
  },
  {
    path: RouteConstant.auth.confirmPasswordReset.path,
    name: RouteConstant.auth.confirmPasswordReset.name,
    component: <CompletePasswordReset />,
    metadata: { isAuthenticated: false },
  },
 
];

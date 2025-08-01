import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "@/store";
import { RouteConstant } from "../routes";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, token } = useSelector(
    (state: RootState) => state.auth
  );

  const isAllowed = isAuthenticated && !!token;

  return isAllowed ? (
    <>{children}</>
  ) : (
    <Navigate to={RouteConstant.public.home.path} replace />
  );
};

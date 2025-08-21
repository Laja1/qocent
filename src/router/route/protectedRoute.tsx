// protectedRoute.tsx
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
    <Navigate to={RouteConstant.auth.signin.path} replace />
  );
};

export const PublicOnlyRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, token } = useSelector(
    (state: RootState) => state.auth
  );
  const isAllowed = isAuthenticated && !!token;

  // If user is authenticated, redirect to dashboard
  if (isAllowed) {
    return <Navigate to={RouteConstant.dashboard.console.path} replace />;
  }

  return <>{children}</>;
};

export const RedirectHandler = () => {
  const { isAuthenticated, token } = useSelector(
    (state: RootState) => state.auth
  );
  const isAllowed = isAuthenticated && !!token;

  if (isAllowed) {
    return <Navigate to={RouteConstant.dashboard.console.path} replace />;
  }
  return <Navigate to={RouteConstant.auth.signin.path} replace />;
};
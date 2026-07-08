  /* eslint-disable @typescript-eslint/no-explicit-any */
  import { RouteConstant } from "@/router/routes";
import type { RootState } from "@/store";
import { authStore } from "@/store/authSlice";
  import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

  const pythonBaseUrl =
    import.meta.env.VITE_PYTHON_BASE_URL ??
    "https://80de-14-137-174-138.ngrok-free.app/api/v1";

  export const rawBaseQuery = fetchBaseQuery({
    baseUrl: pythonBaseUrl,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      // Use context token when active (post-context-switch), fall back to auth token
      const token = (state as any).context?.tokenContextClaim || state.auth.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      if (pythonBaseUrl.includes("ngrok")) {
        headers.set("ngrok-skip-browser-warning", "true");
      }

      return headers;
    },
  });


 const triggerSessionLogout = (api: any, original: unknown) => {
    api.dispatch(authStore.action.logout());
    // hard redirect to fully reset app state
    window.location.href = RouteConstant.auth.signin.path;
  
    return {
      error: {
        status: "SESSION_EXPIRED",
        data: {
          message: "Session expired. Redirecting to login.",
          original,
        },
      },
    };
  };

  export const baseQueryWithAuthGuard = async (
    args: any,
    api: any,
    extraOptions: any
  ) => {
    const result = await rawBaseQuery(args, api, extraOptions);
  
    /**
     * 🔥 FORCE LOGOUT CONDITIONS
     * Matches your backend response:
     *
     * {
     *   status: "fail",
     *   responseCode: 400,
     *   message: "Could not validate credentials: Signature has expired.",
     *   data: {
     *     status_code: 401
     *   }
     * }
     */
  
    const authPathPattern =
      /\/auth\/(login|individual\/signup|business\/signup|verify-otp|resend-otp|forgot-password|reset-password)/;
    const isAuthEndpoint =
      typeof args === "string"
        ? authPathPattern.test(args)
        : authPathPattern.test(args.url ?? "");
  
    if (
      !isAuthEndpoint &&
      result.error &&
      (
        result.error.status === 401 ||
        (result.error.status === 400 &&
          (result.error as any)?.data?.message?.includes("Could not validate credentials"))
      )
    ) {
      return triggerSessionLogout(api, result.error);
    }
  
    return result;
  };
  
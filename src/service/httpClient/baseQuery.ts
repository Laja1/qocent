  /* eslint-disable @typescript-eslint/no-explicit-any */
  import { RouteConstant } from "@/router/routes";
import type { RootState } from "@/store";
import { authStore } from "@/store/authSlice";
  import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

  export const rawBaseQuery = fetchBaseQuery({
    baseUrl: "https://iodmdiaajutj2ivdmc2knkd3xi0eaevr.lambda-url.us-east-1.on.aws/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.token;
  
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
  
      // Don't override X-Key if it's already set by the query
      // prepareHeaders runs AFTER the query's headers, so this should work
      // But let's ensure we don't accidentally remove it
      
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
     *   message: "Could not validate credentials",
     *   data: {
     *     status_code: 401
     *   }
     * }
     */
  
    if (
      result.error &&
      (
        result.error.status === 401 ||
        (result.error.status === 400 &&
          (result.error as any)?.data?.message ===
            "Could not validate credentials")
      )
    ) {
      return triggerSessionLogout(api, result.error);
    }
  
    return result;
  };
  
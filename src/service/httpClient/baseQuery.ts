  /* eslint-disable @typescript-eslint/no-explicit-any */
  import type { RootState } from "@/store";
  import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

  export const baseQuery = fetchBaseQuery({
    baseUrl: "https://p2gjopmk4ldgsuybhkk345oylu0bckic.lambda-url.us-east-1.on.aws/",
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
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RootState } from "@/store";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Step 1: Create a baseQuery that attaches Authorization + X-Key headers
export const baseQuery = fetchBaseQuery({
  baseUrl: "https://p2gjopmk4ldgsuybhkk345oylu0bckic.lambda-url.us-east-1.on.aws/",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.token;


    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

   
    return headers;
  },
});

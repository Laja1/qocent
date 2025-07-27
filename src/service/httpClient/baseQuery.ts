/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RootState } from "@/store";
import { fetchBaseQuery, type BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { authStore } from "@/store/authSlice";

// Step 1: Create a baseQuery that attaches Authorization header
export const baseQueryWithoutReauth = fetchBaseQuery({
  baseUrl: "https://qoocent.onrender.com/api",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQuery: BaseQueryFn<any, unknown, unknown> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQueryWithoutReauth(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Try refreshing token
    const refreshToken = (api.getState() as RootState).auth.refreshToken;
    const refreshResult = await baseQueryWithoutReauth(
      {
        url: "/auth/refresh-token", // adjust to your actual endpoint
        method: "POST",
        body: { refreshToken },
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const newToken = (refreshResult.data as any).accessToken;
      const newRefresh = (refreshResult.data as any).refreshToken;

      // Save new tokens
      api.dispatch(
        authStore.action.setCredentials({
          token: newToken,
          refreshToken: newRefresh,
        })
      );

      // Retry original query
      result = await baseQueryWithoutReauth(args, api, extraOptions);
    } else {
      // Refresh failed — log out
      api.dispatch(authStore.action.logout());
    }
  }

  return result;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { RouteConstant } from "@/router/routes";
import type { RootState } from "@/store";
import { authStore } from "@/store/authSlice";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";


// Step 1: Create a baseQuery that attaches Authorization header
export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_KOTLIN_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("Authorization", `${token}`);
    }
    return headers;
  },
});




export const kotlinBaseQueryWithResponseCodeHandling: typeof baseQuery = async (
  args,
  api,
  extraOptions
) => {
  const rawResult = await baseQuery(args, api, extraOptions);

  if (rawResult.error) {
    return rawResult;
  }

  const result = rawResult.data as any;

  // ✅ SUCCESS
  if (result.responseCode === "00") {
    return {
      data: {
        ...result,
        responseMessage: result.responseMessage,
        responseCode: result.responseCode,
      },
    };
  }

  // 🛑 Detect JWT/session timeout
  const isJWTExpired =
    typeof result.responseMessage === "string" &&
    result.responseMessage.toLowerCase().includes("jwt");

  if (isJWTExpired) {
    // Logout and redirect
    api.dispatch(authStore.action.logout());
    window.location.href = RouteConstant.auth.signin.path;
    return {
      error: {
        status: "SESSION_EXPIRED",
        data: {
          message: "Session expired. Redirecting to login.",
          original: result,
        },
      },
    };
  }

  // 🧯 Default error message
  let errorMessage = "An unknown error occurred";
  if (typeof result.responseMessage === "string") {
    errorMessage = result.responseMessage;
  } else if (
    typeof result.responseMessage === "object" &&
    result.responseMessage !== null
  ) {
    errorMessage = Object.entries(result.responseMessage)
      .map(([key, value]) => `${key}: ${value}`)
      .join(", ");
  }

  return {
    error: {
      status: result.responseCode,
      data: {
        message: errorMessage,
        original: result,
      },
    },
  };
};



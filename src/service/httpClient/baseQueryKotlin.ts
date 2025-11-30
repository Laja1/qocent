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
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});




const triggerSessionLogout = (api: any, original: unknown) => {
  api.dispatch(authStore.action.logout());
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

const shouldLogoutFromBody = (result: any) => {
  if (!result) return false;

  const responseCode = typeof result.responseCode === "string" ? result.responseCode.toUpperCase() : undefined;
  const normalizedMessage =
    typeof result.responseMessage === "string"
      ? result.responseMessage.toLowerCase()
      : "";

  const explicitSessionCodes = ["401", "403", "SESSION_EXPIRED", "UNAUTHORIZED"];
  const hasExplicitCode = responseCode
    ? explicitSessionCodes.includes(responseCode)
    : false;
  const mentionsExpiry =
    normalizedMessage.includes("jwt expired") ||
    normalizedMessage.includes("token expired");

  return hasExplicitCode || mentionsExpiry;
};

export const kotlinBaseQueryWithResponseCodeHandling: typeof baseQuery = async (
  args,
  api,
  extraOptions
) => {
  const rawResult = await baseQuery(args, api, extraOptions);

  if (rawResult.error) {
    const status = rawResult.error.status;
    if (status === 401 || status === 403) {
      return triggerSessionLogout(api, rawResult.error.data);
    }
    return rawResult;
  }

  const result = rawResult.data as any;

  // ✅ SUCCESS
  if (result?.responseCode === "00") {
    return {
      data: {
        ...result,
        responseMessage: result.responseMessage,
        responseCode: result.responseCode,
      },
    };
  }

  if (shouldLogoutFromBody(result)) {
    return triggerSessionLogout(api, result);
  }

  // 🧯 Default error message
  let errorMessage = "An unknown error occurred";
  if (typeof result?.responseMessage === "string") {
    errorMessage = result.responseMessage;
  } else if (
    typeof result?.responseMessage === "object" &&
    result?.responseMessage !== null
  ) {
    errorMessage = Object.entries(result.responseMessage)
      .map(([key, value]) => `${key}: ${value}`)
      .join(", ");
  }

  return {
    error: {
      status: result?.responseCode,
      data: {
        message: errorMessage,
        original: result,
      },
    },
  };
};



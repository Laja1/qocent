/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RootState } from "@/store";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Step 1: Create a baseQuery that attaches Authorization header
const baseQuery = fetchBaseQuery({
  baseUrl: "https://lefny0zex1.execute-api.us-east-1.amazonaws.com/api",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Step 2: Wrap it with responseCode handling logic
export const baseQueryWithResponseCodeHandling: typeof baseQuery = async (
  args,
  api,
  extraOptions
) => {
  const rawResult = await baseQuery(args, api, extraOptions);

  // Handle HTTP/network error (non-200, unreachable, etc.)
  if (rawResult.error) {
    return rawResult;
  }

  const result = rawResult.data as any;

  // Handle responseCode === "00" (success)
  if (result.responseCode === "00") {
    return {
      data: {
        ...result, // Include the actual data
        responseMessage: result.responseMessage, // Include the response message
        responseCode: result.responseCode, // Include the response code
      },
    };
  }

  // Handle responseCode !== "00" (failure)
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

/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RootState } from "@/store";
import { fetchBaseQuery} from "@reduxjs/toolkit/query/react";

// Step 1: Create a baseQuery that attaches Authorization header
export const baseQuery = fetchBaseQuery({
  baseUrl: "https://qoocent.onrender.com/api",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

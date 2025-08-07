/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import { kotlinBaseQueryWithResponseCodeHandling } from "../httpClient/baseQueryKotlin";
import type { waitlistFormPayload } from "@/models/request/waitlistRequest";
import type { genericResponse } from "@/models/response";



export const waitlistApi = createApi({
  reducerPath: "waitlistApi",
  baseQuery: kotlinBaseQueryWithResponseCodeHandling,
  endpoints: (build) => ({
     

createWaitlist: build.mutation<genericResponse, waitlistFormPayload>({
  query: (body) => ({
    url: `/waitlist/add`,
    method: "POST",
    body:body
  }),
}), 

  }),
});

export const {
useCreateWaitlistMutation,
} = waitlistApi;

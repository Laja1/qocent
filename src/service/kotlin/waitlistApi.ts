/* eslint-disable @typescript-eslint/no-explicit-any */
import type { waitlistFormPayload } from "@/models/request/waitlistRequest";
import type { genericResponse } from "@/models/response";
import { kotlinBaseApi } from "./baseApi";
import { KotlinWaitlistEndpoints } from "./endpoints";

export const waitlistApi = kotlinBaseApi.injectEndpoints({
  endpoints: (build) => ({
createWaitlist: build.mutation<genericResponse, waitlistFormPayload>({
  query: (body) => ({
    url: KotlinWaitlistEndpoints.addwaitlist,
    method: "POST",
    body:body
  }),
}), 

  }),
});

export const {
useCreateWaitlistMutation,
} = waitlistApi;

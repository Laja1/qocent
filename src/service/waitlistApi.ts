/* eslint-disable @typescript-eslint/no-explicit-any */
import type { waitlistFormPayload } from "@/models/request/waitlistRequest";
import type { genericResponse } from "@/models/response";
import { kotlinBaseApi } from "./kotlinBaseApi";
import { KotlinWaitlistEndpoints, kotlinPath } from "./endpoints";

type AnyBody = Record<string, any>;
type AnyResp = { responseCode: string; responseMessage: string; data?: any };

export const waitlistApi = kotlinBaseApi.injectEndpoints({
  endpoints: (build) => ({
    createWaitlist: build.mutation<genericResponse, waitlistFormPayload>({
      query: (body) => ({ url: KotlinWaitlistEndpoints.add, method: "POST", body }),
    }),
    assignLeadToWaitlist: build.mutation<genericResponse, AnyBody>({
      query: (body) => ({ url: KotlinWaitlistEndpoints.assignLead, method: "POST", body }),
    }),
    deleteWaitlist: build.mutation<genericResponse, AnyBody>({
      query: (body) => ({ url: KotlinWaitlistEndpoints.delete, method: "POST", body }),
    }),
    readWaitlist: build.query<AnyResp, void>({
      query: () => KotlinWaitlistEndpoints.read,
    }),
    readWaitlistByEmail: build.query<AnyResp, { waitlistEmail: string }>({
      query: ({ waitlistEmail }) =>
        kotlinPath(KotlinWaitlistEndpoints.readByEmail, { waitlistEmail }),
    }),
    readWaitlistById: build.query<AnyResp, { waitlistId: string | number }>({
      query: ({ waitlistId }) => kotlinPath(KotlinWaitlistEndpoints.readById, { waitlistId }),
    }),
    readWaitlistByLeadId: build.query<AnyResp, { waitlistLeadId: string | number }>({
      query: ({ waitlistLeadId }) =>
        kotlinPath(KotlinWaitlistEndpoints.readByLeadId, { waitlistLeadId }),
    }),
    updateWaitlist: build.mutation<genericResponse, AnyBody>({
      query: (body) => ({ url: KotlinWaitlistEndpoints.update, method: "POST", body }),
    }),
    updateWaitlistStatus: build.mutation<
      genericResponse,
      { waitlistId: string | number; status: string }
    >({
      query: ({ waitlistId, status }) => ({
        url: kotlinPath(KotlinWaitlistEndpoints.updateStatus, { waitlistId, status }),
        method: "POST",
      }),
    }),
  }),
});

export const {
  useCreateWaitlistMutation,
  useAssignLeadToWaitlistMutation,
  useDeleteWaitlistMutation,
  useReadWaitlistQuery,
  useReadWaitlistByEmailQuery,
  useReadWaitlistByIdQuery,
  useReadWaitlistByLeadIdQuery,
  useUpdateWaitlistMutation,
  useUpdateWaitlistStatusMutation,
} = waitlistApi;

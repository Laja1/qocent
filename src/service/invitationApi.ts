import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiEnums } from "@/utilities/enums";
import { baseQueryWithAuthGuard } from "./httpClient/baseQuery";
import type {
  AcceptInvitationRequest,
  CreateInvitationRequest,
  RejectInvitationRequest,
} from "@/models/request/invitationRequest";
import type {
  InvitationAPIResponse,
  InvitationStatus,
} from "@/models/response/invitationResponse";

export const invitationApi = createApi({
  reducerPath: "invitationApi",
  baseQuery: baseQueryWithAuthGuard,
  tagTypes: [ApiEnums.Invitation],
  endpoints: (build) => ({
    createInvitation: build.mutation<
      InvitationAPIResponse,
      { account_id: string; body: CreateInvitationRequest }
    >({
      query: ({ account_id, body }) => ({
        url: `/invitations/${account_id}/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: ApiEnums.Invitation, id: "LIST" }],
    }),

    getMyInvitations: build.query<
      InvitationAPIResponse,
      { status?: InvitationStatus } | void
    >({
      query: (arg) => ({
        url: "/invitations/my-invitations",
        params: arg?.status ? { status: arg.status } : undefined,
      }),
      providesTags: [{ type: ApiEnums.Invitation, id: "LIST" }],
    }),

    acceptInvitation: build.mutation<
      InvitationAPIResponse,
      AcceptInvitationRequest
    >({
      query: (body) => ({
        url: "/invitations/accept",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: ApiEnums.Invitation, id: "LIST" }],
    }),

    rejectInvitation: build.mutation<
      InvitationAPIResponse,
      RejectInvitationRequest
    >({
      query: (body) => ({
        url: "/invitations/reject",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: ApiEnums.Invitation, id: "LIST" }],
    }),
  }),
});

export const {
  useCreateInvitationMutation,
  useGetMyInvitationsQuery,
  useAcceptInvitationMutation,
  useRejectInvitationMutation,
} = invitationApi;

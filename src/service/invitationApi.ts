import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiEnums } from "@/utilities/enums";
import { baseQueryWithAuthGuard } from "./httpClient/baseQuery";
import type { SendInvitationRequest } from "@/models/request/invitationRequest";
import type {
  InvitationAPIResponse,
  InvitationListAPIResponse,
  InvitationStatus,
  SendInvitationResponse,
} from "@/models/response/invitationResponse";

export const invitationApi = createApi({
  reducerPath: "invitationApi",
  baseQuery: baseQueryWithAuthGuard,
  tagTypes: [ApiEnums.Invitation],
  endpoints: (build) => ({
    sendInvitation: build.mutation<SendInvitationResponse, SendInvitationRequest>({
      query: (body) => ({
        url: "/invitations",
        method: "POST",
        body,
      }),
      invalidatesTags: (_result, _error, { account_id }) => [
        { type: ApiEnums.Invitation, id: "SENT" },
        { type: ApiEnums.Invitation, id: "ACCOUNT" },
        { type: ApiEnums.Invitation, id: `ACCOUNT_${account_id}` },
      ],
    }),

    listSentInvitations: build.query<
      InvitationListAPIResponse,
      { status?: InvitationStatus } | void
    >({
      query: (arg) => ({
        url: "/invitations",
        params: arg?.status ? { status: arg.status } : undefined,
      }),
      providesTags: [{ type: ApiEnums.Invitation, id: "SENT" }],
    }),

    revokeInvitation: build.mutation<InvitationAPIResponse, string>({
      query: (invite_id) => ({
        url: `/invitations/${invite_id}/revoke`,
        method: "POST",
      }),
      invalidatesTags: [
        { type: ApiEnums.Invitation, id: "SENT" },
        { type: ApiEnums.Invitation, id: "ACCOUNT" },
      ],
    }),

    getMyInvitations: build.query<
      InvitationListAPIResponse,
      { status?: InvitationStatus } | void
    >({
      query: (arg) => ({
        url: "/invitations/me",
        params: arg?.status ? { status: arg.status } : undefined,
      }),
      providesTags: [{ type: ApiEnums.Invitation, id: "INBOX" }],
    }),

    acceptInvitation: build.mutation<InvitationAPIResponse, string>({
      query: (invite_id) => ({
        url: `/invitations/${invite_id}/accept`,
        method: "POST",
      }),
      invalidatesTags: [{ type: ApiEnums.Invitation, id: "INBOX" }],
    }),

    rejectInvitation: build.mutation<InvitationAPIResponse, string>({
      query: (invite_id) => ({
        url: `/invitations/${invite_id}/reject`,
        method: "POST",
      }),
      invalidatesTags: [{ type: ApiEnums.Invitation, id: "INBOX" }],
    }),

    listAccountInvitations: build.query<
      InvitationListAPIResponse,
      { account_id: string; status?: InvitationStatus }
    >({
      query: ({ account_id, status }) => ({
        url: `/invitations/account/${account_id}`,
        params: status ? { status } : undefined,
      }),
      providesTags: (_result, _error, { account_id }) => [
        { type: ApiEnums.Invitation, id: "ACCOUNT" },
        { type: ApiEnums.Invitation, id: `ACCOUNT_${account_id}` },
      ],
    }),

    getInvitation: build.query<InvitationAPIResponse, string>({
      query: (invite_id) => `/invitations/${invite_id}`,
      providesTags: (_result, _error, id) => [
        { type: ApiEnums.Invitation, id },
      ],
    }),
  }),
});

export const {
  useSendInvitationMutation,
  useListSentInvitationsQuery,
  useRevokeInvitationMutation,
  useGetMyInvitationsQuery,
  useAcceptInvitationMutation,
  useRejectInvitationMutation,
  useListAccountInvitationsQuery,
  useGetInvitationQuery,
} = invitationApi;

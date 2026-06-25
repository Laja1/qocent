import { ApiEnums } from "@/utilities/enums";
import type {
  BusinessInviteUserRequest,
  UserRequestJoinRequest,
  UserRespondToInvitePayload,
  BusinessRespondToRequestPayload,
} from "@/models/request/businessInviteRequest";
import type {
  BusinessInviteResponse,
  BusinessInviteListResponse,
  InviteActionResponse,
  InviteStatus,
} from "@/models/response/businessInviteResponse";
import { pythonBaseApi } from "./baseApi";

export const businessInviteApi = pythonBaseApi.injectEndpoints({
  endpoints: (build) => ({
    inviteUser: build.mutation<
      BusinessInviteResponse,
      { business_id: string; body: BusinessInviteUserRequest }
    >({
      query: ({ business_id, body }) => ({
        url: `/business-invites/business/${business_id}/invite-user`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: ApiEnums.BusinessInvite, id: "LIST" }],
    }),

    cancelInvite: build.mutation<InviteActionResponse, { invite_id: string }>({
      query: ({ invite_id }) => ({
        url: `/business-invites/${invite_id}/cancel-invite`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: ApiEnums.BusinessInvite, id: "LIST" }],
    }),

    getBusinessInvites: build.query<
      BusinessInviteListResponse,
      { business_id: string; status?: InviteStatus }
    >({
      query: ({ business_id, status }) => ({
        url: `/business-invites/business/${business_id}`,
        params: status ? { status } : undefined,
      }),
      providesTags: [{ type: ApiEnums.BusinessInvite, id: "LIST" }],
    }),

    requestJoinBusiness: build.mutation<
      BusinessInviteResponse,
      UserRequestJoinRequest
    >({
      query: (body) => ({
        url: "/business-invites/join-request",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: ApiEnums.BusinessInvite, id: "LIST" }],
    }),

    cancelJoinRequest: build.mutation<
      InviteActionResponse,
      { invite_id: string }
    >({
      query: ({ invite_id }) => ({
        url: `/business-invites/${invite_id}/cancel-request`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: ApiEnums.BusinessInvite, id: "LIST" }],
    }),

    userRespondToInvite: build.mutation<
      InviteActionResponse,
      { invite_id: string; body: UserRespondToInvitePayload; csp?: string }
    >({
      query: ({ invite_id, body, csp }) => ({
        url: `/business-invites/${invite_id}/user-respond`,
        method: "PATCH",
        params: csp ? { csp } : undefined,
        body,
      }),
      invalidatesTags: [{ type: ApiEnums.BusinessInvite, id: "LIST" }],
    }),

    businessRespondToRequest: build.mutation<
      InviteActionResponse,
      { invite_id: string; body: BusinessRespondToRequestPayload }
    >({
      query: ({ invite_id, body }) => ({
        url: `/business-invites/${invite_id}/business-respond`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: ApiEnums.BusinessInvite, id: "LIST" }],
    }),

    getMyInvites: build.query<
      BusinessInviteListResponse,
      { status?: InviteStatus } | void
    >({
      query: (arg) => ({
        url: "/business-invites/me",
        params: arg?.status ? { status: arg.status } : undefined,
      }),
      providesTags: [{ type: ApiEnums.BusinessInvite, id: "LIST" }],
    }),

    generateCloudLoginUrl: build.mutation<
      { message: string; account_id: string; csp: string },
      { account_id: string; csp: string }
    >({
      query: ({ account_id, csp }) => ({
        url: "/business-invites/cloud-login-url",
        method: "POST",
        params: { account_id, csp },
      }),
    }),
  }),
});

export const {
  useInviteUserMutation,
  useCancelInviteMutation,
  useGetBusinessInvitesQuery,
  useRequestJoinBusinessMutation,
  useCancelJoinRequestMutation,
  useUserRespondToInviteMutation,
  useBusinessRespondToRequestMutation,
  useGetMyInvitesQuery,
  useGenerateCloudLoginUrlMutation,
} = businessInviteApi;

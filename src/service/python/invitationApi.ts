import { createApi } from "@reduxjs/toolkit/query/react";
import type {
  updateProfessionalServiceRequest,
} from "@/models/request/authRequest";

import type { baseResponse, genericResponse } from "@/models/response";
import { ApiEnums } from "@/utilities/enums";
import {  baseQueryWithAuthGuard } from "../httpClient/baseQuery";
import type { createInviteRequest, RevokeInvitationPayload } from "@/models/request/inviteRequest";
import type { InvitationListResponse } from "@/models/response/invitationResponse";

const controller = 'invitations'
export const invitationApi = createApi({
  reducerPath: "invitationApi",
  baseQuery: baseQueryWithAuthGuard,
  tagTypes:[ApiEnums.Auth,ApiEnums.Member],
  endpoints: (build) => ({
    createInvitation: build.mutation<baseResponse, {body:createInviteRequest,accountId:string}>({
      query: ({body,accountId}) => ({
        url: `/${controller}/${accountId}/create`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: [{ type: ApiEnums.Member, id: "LIST" }],
    }),
    
    acceptInvite: build.mutation<baseResponse, {invite_id:string}>({
      query: (body) => ({
        url:  `/${controller}/accept`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: [{ type: ApiEnums.Member, id: "LIST" }],
    }),
    
    rejectInvite: build.mutation<baseResponse, {invite_id:string}>({
      query: (body) => ({
        url:  `/${controller}/reject`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: [{ type: ApiEnums.Member, id: "LIST" }],
    }),
    
    revokeInvitation: build.mutation<baseResponse, {account_id:string, body:RevokeInvitationPayload}>({
      query: ({account_id, body}) => ({
        url: `/${controller}/${account_id}/revoke`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: [{ type: ApiEnums.Member, id: "LIST" }],
    }),
    
    getMyInvitations: build.query<InvitationListResponse, {status?:string}>({
      query: ({status}) => {
        const params = status ? `?status=${status}` : '';
        return `/${controller}/my-invitations${params}`;
      },
      providesTags: [{ type: ApiEnums.Member, id: "LIST" }],
    }),
    
    getAccountInvitations: build.query<InvitationListResponse, {account_id:string, status?:string}>({
      query: ({account_id, status}) => {
        const params = status ? `?status=${status}` : '';
        return `/${controller}/account_invite/${account_id}${params}`;
      },
      providesTags: [{ type: ApiEnums.Member, id: "LIST" }],
    }),
    
    getPendingCloudInvitations: build.query<baseResponse, void>({
      query: () => `/${controller}/cloud-invitations/pending`,
      providesTags: [{ type: ApiEnums.Member, id: "LIST" }],
    }),
  
   
    updateProfessionalService:build.mutation<genericResponse,updateProfessionalServiceRequest[]>({
      query: (body) => ({
        url: "/authentication/business/professional-services/update",
        method: "POST",
        body: body,
      }),
      invalidatesTags: [{ type: ApiEnums.Member, id: "LIST" }],
    }),
  
   
   
  }),
});

export const {
  useCreateInvitationMutation,
  useAcceptInviteMutation,
  useRejectInviteMutation,
  useRevokeInvitationMutation,
  useGetMyInvitationsQuery,
  useGetAccountInvitationsQuery,
  useGetPendingCloudInvitationsQuery,
} = invitationApi;

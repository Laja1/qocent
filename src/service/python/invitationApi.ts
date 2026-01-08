import { createApi } from "@reduxjs/toolkit/query/react";
import type {
  updateProfessionalServiceRequest,
} from "@/models/request/authRequest";

import type { baseResponse, genericResponse } from "@/models/response";
import { ApiEnums } from "@/utilities/enums";
import {  baseQueryWithAuthGuard } from "../httpClient/baseQuery";
import type { createInviteRequest } from "@/models/request/inviteRequest";

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
    }),
    acceptInvite: build.mutation<baseResponse, {invite_id:string}>({
      query: (body) => ({
        url:  `/${controller}/accept`,
        method: "POST",
        body: body,
      }),
    }),
    rejectInvite: build.mutation<baseResponse, {invite_id:string}>({
      query: (body) => ({
        url:  `/${controller}/reject`,
        method: "POST",
        body: body,
      }),
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
} = invitationApi;

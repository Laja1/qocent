import { createApi } from "@reduxjs/toolkit/query/react";
import type { baseResponse } from "@/models/response";
import { ApiEnums } from "@/utilities/enums";
import { baseQueryWithAuthGuard } from "./httpClient/baseQuery";

const controller = 'invitations'
export const invitationApi = createApi({
  reducerPath: "invitationApi",
  baseQuery: baseQueryWithAuthGuard,
  tagTypes:[ApiEnums.Auth,ApiEnums.Member],
  endpoints: (build) => ({
    acceptInvite: build.mutation<baseResponse, {invite_id:string}>({
      query: (body) => ({
        url: `/${controller}/accept`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: [{ type: ApiEnums.Member, id: "LIST" }],
    }),

    rejectInvite: build.mutation<baseResponse, {invite_id:string}>({
      query: (body) => ({
        url: `/${controller}/reject`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: [{ type: ApiEnums.Member, id: "LIST" }],
    }),
  }),
});

export const {
  useAcceptInviteMutation,
  useRejectInviteMutation,
} = invitationApi;

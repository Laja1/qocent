import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiEnums } from "@/utilities/enums";
import { baseQueryWithAuthGuard } from "./httpClient/baseQuery";
import type { AccountMembershipPayload, DeleteMemberPayload } from "@/models/request/accountRequest";
import type { AccountMembersListResponse, AccountStatusResponse } from "@/models/response/accountResponse";
import type { baseResponse } from "@/models/response";

const controller = 'account'
export const accountsApi = createApi({
  reducerPath: "accountsApi",
  baseQuery: baseQueryWithAuthGuard,
  tagTypes:[ApiEnums.Auth, ApiEnums.Member, ApiEnums.Site],
  endpoints: (build) => ({
    updateAccountMembership: build.mutation<baseResponse, {account_id:string, body:AccountMembershipPayload}>({
      query: ({account_id, body}) => ({
        url: `/${controller}/${account_id}/update_membership`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: [{ type: ApiEnums.Member, id: "LIST" }],
    }),

    closeAccount: build.mutation<AccountStatusResponse, string>({
      query: (account_id) => ({
        url: `/${controller}/${account_id}/close`,
        method: "POST",
      }),
      invalidatesTags: [
        { type: ApiEnums.Member, id: "LIST" },
        { type: ApiEnums.Site, id: "LIST" },
      ],
    }),

    getAccountMembers: build.query<AccountMembersListResponse, string>({
      query: (account_id) => `/${controller}/${account_id}/members`,
      providesTags: [{ type: ApiEnums.Member, id: "LIST" }],
    }),

    removeAccountMember: build.mutation<baseResponse, {account_id:string, body:DeleteMemberPayload}>({
      query: ({account_id, body}) => ({
        url: `/${controller}/${account_id}/members`,
        method: "DELETE",
        body: body,
      }),
      invalidatesTags: [{ type: ApiEnums.Member, id: "LIST" }],
    }),
  }),
});

export const {
  useUpdateAccountMembershipMutation,
  useCloseAccountMutation,
  useGetAccountMembersQuery,
  useRemoveAccountMemberMutation,
} = accountsApi;

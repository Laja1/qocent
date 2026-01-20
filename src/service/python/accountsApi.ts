import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiEnums } from "@/utilities/enums";
import { baseQueryWithAuthGuard } from "../httpClient/baseQuery";
import type { 
  UpdateAccountPayload, 
  AccountMembershipPayload, 
  TransferAdminPayload,
  DeleteMemberPayload 
} from "@/models/request/accountRequest";
import type { 
  AccountListResponse, 
  AccountResponse, 
  AccountStatusResponse,
  AccountMembersListResponse 
} from "@/models/response/accountResponse";
import type { baseResponse } from "@/models/response";

const controller = 'account'
export const accountsApi = createApi({
  reducerPath: "accountsApi",
  baseQuery: baseQueryWithAuthGuard,
  tagTypes:[ApiEnums.Auth,ApiEnums.Member],
  endpoints: (build) => ({
    searchAccounts: build.query<AccountListResponse, {q:string, include_inactive?:boolean}>({
      query: ({q, include_inactive = false}) => `/${controller}/search?q=${q}&include_inactive=${include_inactive}`,
    }),
    
    getMyAccounts: build.query<AccountListResponse, void>({
      query: () => `/${controller}/me`,
      providesTags: [{ type: ApiEnums.Member, id: "LIST" }],
    }),
    
    getAccount: build.query<AccountResponse, string>({
      query: (account_id) => `/${controller}/${account_id}`,
    }),
    
    updateAccount: build.mutation<AccountResponse, {account_id:string, body:UpdateAccountPayload}>({
      query: ({account_id, body}) => ({
        url: `/${controller}/${account_id}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: [{ type: ApiEnums.Member, id: "LIST" }],
    }),
    
    getActiveAccount: build.query<AccountResponse, string>({
      query: (account_id) => `/${controller}/active/${account_id}`,
    }),
    
    updateAccountMembership: build.mutation<baseResponse, {account_id:string, body:AccountMembershipPayload}>({
      query: ({account_id, body}) => ({
        url: `/${controller}/${account_id}/update_membership`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: [{ type: ApiEnums.Member, id: "LIST" }],
    }),
    
    transferAdminMembership: build.mutation<baseResponse, {account_id:string, body:TransferAdminPayload}>({
      query: ({account_id, body}) => ({
        url: `/${controller}/${account_id}/transfer_admin`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: [{ type: ApiEnums.Member, id: "LIST" }],
    }),
    
    updateAccountStatus: build.mutation<AccountStatusResponse, {account_id:string, new_status:string}>({
      query: ({account_id, new_status}) => ({
        url: `/${controller}/${account_id}/status?new_status=${new_status}`,
        method: "PATCH",
      }),
      invalidatesTags: [{ type: ApiEnums.Member, id: "LIST" }],
    }),
    
    closeAccount: build.mutation<AccountStatusResponse, string>({
      query: (account_id) => ({
        url: `/${controller}/${account_id}/close`,
        method: "POST",
      }),
      invalidatesTags: [{ type: ApiEnums.Member, id: "LIST" }],
    }),
    
    reactivateAccount: build.mutation<AccountStatusResponse, string>({
      query: (account_id) => ({
        url: `/${controller}/${account_id}/reactivate`,
        method: "POST",
      }),
      invalidatesTags: [{ type: ApiEnums.Member, id: "LIST" }],
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
  useSearchAccountsQuery,
  useGetMyAccountsQuery,
  useGetAccountQuery,
  useUpdateAccountMutation,
  useGetActiveAccountQuery,
  useUpdateAccountMembershipMutation,
  useTransferAdminMembershipMutation,
  useUpdateAccountStatusMutation,
  useCloseAccountMutation,
  useReactivateAccountMutation,
  useGetAccountMembersQuery,
  useRemoveAccountMemberMutation,
} = accountsApi;
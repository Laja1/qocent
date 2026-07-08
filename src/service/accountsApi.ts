import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiEnums } from "@/utilities/enums";
import { baseQueryWithAuthGuard } from "./httpClient/baseQuery";
import type {
  AccountMembershipPayload,
  DeleteMemberPayload,
  TransferAdminRequest,
  UpdateAccountRequest,
} from "@/models/request/accountRequest";
import type {
  AccountListResponse,
  AccountMembersListResponse,
  AccountResponse,
  AccountStatusResponse,
  RemoveMemberResponse,
  TransferAdminResponse,
} from "@/models/response/accountResponse";
import type { baseResponse } from "@/models/response";

const controller = "account";

function accountMeTag(provider?: string | null) {
  return {
    type: ApiEnums.Site as const,
    id: provider ? `ME_${provider.toLowerCase()}` : "ME",
  };
}

export const accountsApi = createApi({
  reducerPath: "accountsApi",
  baseQuery: baseQueryWithAuthGuard,
  tagTypes: [ApiEnums.Auth, ApiEnums.Member, ApiEnums.Site],
  endpoints: (build) => ({
    searchAccounts: build.query<
      AccountListResponse,
      { q: string; include_inactive?: boolean }
    >({
      query: ({ q, include_inactive }) => ({
        url: `/${controller}/search`,
        params: { q, ...(include_inactive ? { include_inactive } : {}) },
      }),
      providesTags: [{ type: ApiEnums.Site, id: "LIST" }],
    }),

    getMyAccounts: build.query<
      AccountListResponse,
      { provider?: string | null } | void
    >({
      query: (arg) => ({
        url: `/${controller}/me`,
        params: arg?.provider ? { provider: arg.provider } : undefined,
      }),
      providesTags: (_result, _error, arg) => [
        { type: ApiEnums.Site, id: "LIST" },
        accountMeTag(arg?.provider),
      ],
    }),

    getAccount: build.query<AccountResponse, string>({
      query: (account_id) => `/${controller}/${account_id}`,
      providesTags: (_result, _error, id) => [{ type: ApiEnums.Site, id }],
    }),

    updateAccount: build.mutation<
      AccountResponse,
      { account_id: string; body: UpdateAccountRequest }
    >({
      query: ({ account_id, body }) => ({
        url: `/${controller}/${account_id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [{ type: ApiEnums.Site, id: "LIST" }],
    }),

    updateAccountMembership: build.mutation<
      baseResponse,
      { account_id: string; body: AccountMembershipPayload }
    >({
      query: ({ account_id, body }) => ({
        url: `/${controller}/${account_id}/update_membership`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: ApiEnums.Member, id: "LIST" }],
    }),

    transferAdmin: build.mutation<
      TransferAdminResponse,
      { account_id: string; body: TransferAdminRequest }
    >({
      query: ({ account_id, body }) => ({
        url: `/${controller}/${account_id}/transfer_admin`,
        method: "POST",
        body,
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

    reactivateAccount: build.mutation<AccountStatusResponse, string>({
      query: (account_id) => ({
        url: `/${controller}/${account_id}/reactivate`,
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

    removeAccountMember: build.mutation<
      RemoveMemberResponse,
      { account_id: string; body: DeleteMemberPayload }
    >({
      query: ({ account_id, body }) => ({
        url: `/${controller}/${account_id}/members`,
        method: "DELETE",
        body,
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
  useUpdateAccountMembershipMutation,
  useTransferAdminMutation,
  useCloseAccountMutation,
  useReactivateAccountMutation,
  useGetAccountMembersQuery,
  useRemoveAccountMemberMutation,
} = accountsApi;

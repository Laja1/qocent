import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiEnums } from "@/utilities/enums";
import { baseQueryWithAuthGuard } from "./httpClient/baseQuery";
import type {
  CompleteInvitePayload,
  CreateAccountPayload,
  GrantAccessPayload,
  InviteAccountPayload,
} from "@/models/request/cloudService";
import type {
  AccountActionResponse,
  CloudAccountResponse,
  GenerateLoginUrlEmailResponse,
  GrantAccessResponse,
  InitiateInviteResponse,
} from "@/models/response/cloudServiceResponse";
import { accountsApi } from "./accountsApi";

function accountMeTag(provider?: string | null) {
  return {
    type: ApiEnums.Site as const,
    id: provider ? `ME_${provider.toLowerCase()}` : "ME",
  };
}

function invalidateMyAccounts(dispatch: (action: unknown) => void, csp: string) {
  dispatch(
    accountsApi.util.invalidateTags([
      { type: ApiEnums.Site, id: "LIST" },
      accountMeTag(csp),
      accountMeTag(),
    ])
  );
}

export const cloudServicesApi = createApi({
  reducerPath: "cloudServices",
  baseQuery: baseQueryWithAuthGuard,
  tagTypes: [ApiEnums.Auth, ApiEnums.Member, ApiEnums.Site],
  endpoints: (build) => ({
    createAccount: build.mutation<
      CloudAccountResponse,
      { body?: CreateAccountPayload | null; csp: string }
    >({
      query: ({ body, csp }) => ({
        url: `/${csp}/create_account`,
        method: "POST",
        body: body ?? null,
      }),
      async onQueryStarted({ csp }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          invalidateMyAccounts(dispatch, csp);
        } catch {
          // no-op: creation failed
        }
      },
    }),

    initiateInviteAccount: build.mutation<
      InitiateInviteResponse,
      { body: InviteAccountPayload; csp: string }
    >({
      query: ({ body, csp }) => ({
        url: `/${csp}/initiate_invite_account`,
        method: "POST",
        body,
      }),
    }),

    completeInviteAccount: build.mutation<
      AccountActionResponse,
      { body: CompleteInvitePayload; csp: string }
    >({
      query: ({ body, csp }) => ({
        url: `/${csp}/complete_invite_account`,
        method: "POST",
        body,
      }),
      async onQueryStarted({ csp }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          invalidateMyAccounts(dispatch, csp);
        } catch {
          // no-op: completion failed
        }
      },
    }),

    generateProviderLoginUrl: build.mutation<
      GenerateLoginUrlEmailResponse,
      { csp: string; account_id: string }
    >({
      query: ({ csp, account_id }) => ({
        url: `/${csp}/generate-provider-login-url`,
        method: "POST",
        params: { account_id },
      }),
    }),

    grantAdminAccess: build.mutation<
      GrantAccessResponse,
      { csp: string; body: GrantAccessPayload }
    >({
      query: ({ csp, body }) => ({
        url: `/${csp}/grant-admin-access`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useCreateAccountMutation,
  useInitiateInviteAccountMutation,
  useCompleteInviteAccountMutation,
  useGenerateProviderLoginUrlMutation,
  useGrantAdminAccessMutation,
} = cloudServicesApi;

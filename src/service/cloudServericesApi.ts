import { createApi } from "@reduxjs/toolkit/query/react"
import { ApiEnums } from "@/utilities/enums";
import { baseQueryWithAuthGuard } from "./httpClient/baseQuery";
import type { CompleteInvitePayload, CreateAccountPayload, InviteAccountPayload } from "@/models/request/cloudService";
import type { CreateAccountResponse, GenerateLoginUrlEmailResponse, InitiateInviteResponse } from "@/models/response/cloudServiceResponse";

export const cloudServicesApi = createApi({
  reducerPath: "cloudServices",
  baseQuery: baseQueryWithAuthGuard,
  tagTypes:[ApiEnums.Auth,ApiEnums.Member],
  endpoints: (build) => ({
    createAccount: build.mutation<CreateAccountResponse, {body:CreateAccountPayload,csp:string}>({
      query: ({body,csp}) => ({
        url: `/${csp}/create_account`,
        method: "POST",
        body: body,
      }),
    }),

    initiateInviteAccount: build.mutation<InitiateInviteResponse, {body:InviteAccountPayload,csp:string}>({
      query: ({body,csp}) => ({
        url: `/${csp}/initiate_invite_account`,
        method: "POST",
        body: body,
      }),
    }),

    completeInviteAccount: build.mutation<CreateAccountResponse, {body:CompleteInvitePayload,csp:string}>({
      query: ({body,csp}) => ({
        url: `/${csp}/complete_invite_account`,
        method: "POST",
        body: body,
      }),
    }),

    generateProviderLoginUrl: build.mutation<GenerateLoginUrlEmailResponse, {csp:string,account_id:string}>({
      query: ({csp,account_id}) => ({
        url: `/${csp}/generate-provider-login-url?account_id=${account_id}`,
        method: "POST",
      }),
    }),

    grantAdminAccess: build.mutation<GenerateLoginUrlEmailResponse, { csp: string; account_id: string }>({
      query: ({ csp, account_id }) => ({
        url: `/${csp}/grant-admin-access`,
        method: "POST",
        params: { account_id },
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

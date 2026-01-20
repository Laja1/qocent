import { createApi } from "@reduxjs/toolkit/query/react"
import { ApiEnums } from "@/utilities/enums";
import { baseQueryWithAuthGuard } from "../httpClient/baseQuery";
import type { CreateAccountPayload, InviteAccountPayload, CompleteInvitePayload, GrantAccessPayload } from "@/models/request/cloudService";
import type { CreateAccountResponse, InitiateInviteResponse } from "@/models/response/cloudServiceResponse";
import type { baseResponse } from "@/models/response";

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
    
    grantAdminAccess: build.mutation<baseResponse, {body:GrantAccessPayload,csp:string}>({
      query: ({body,csp}) => ({
        url: `/${csp}/grant-admin-access`,
        method: "POST",
        body: body,
      }),
    }),
    
    generateProviderLoginUrl: build.mutation<baseResponse, {csp:string,account_id:string}>({
      query: ({csp,account_id}) => ({
        url: `/${csp}/generate-provider-login-url?account_id=${account_id}`,
        method: "POST",
      }),
    }),

  }),
});

export const {
  useCreateAccountMutation,
  useInitiateInviteAccountMutation,
  useCompleteInviteAccountMutation,
  useGrantAdminAccessMutation,
  useGenerateProviderLoginUrlMutation,
} = cloudServicesApi;

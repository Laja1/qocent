import { kotlinBaseApi } from "./kotlinBaseApi";
import { KotlinAuthEndpoints, kotlinPath } from "./endpoints";
import type { invitationRequest } from "@/models/request/authRequest";
import type { genericResponse } from "@/models/response";
import { ApiEnums } from "@/utilities/enums";

/* eslint-disable @typescript-eslint/no-explicit-any */
type AnyBody = Record<string, any>;
type AnyResp = { responseCode: string; responseMessage: string; data?: any };

export const authKotlinApi = kotlinBaseApi.injectEndpoints({
  endpoints: (build) => ({
    inviteUserToSite: build.mutation<genericResponse, invitationRequest>({
      query: (body) => ({ url: KotlinAuthEndpoints.inviteUser, method: "POST", body }),
      invalidatesTags: [{ type: ApiEnums.Member, id: "LIST" }],
    }),
    acceptInvitation: build.mutation<genericResponse, AnyBody>({
      query: (body) => ({ url: KotlinAuthEndpoints.acceptInvitation, method: "POST", body }),
    }),
    getAccountMembers: build.query<AnyResp, { accountCode: string }>({
      query: ({ accountCode }) => kotlinPath(KotlinAuthEndpoints.accountMembers, { accountCode }),
      providesTags: [{ type: ApiEnums.Member, id: "LIST" }],
    }),
    activateAccount: build.mutation<genericResponse, { accountCode: string }>({
      query: ({ accountCode }) => ({
        url: kotlinPath(KotlinAuthEndpoints.activateAccount, { accountCode }),
        method: "POST",
      }),
    }),
    deactivateAccount: build.mutation<genericResponse, { accountCode: string }>({
      query: ({ accountCode }) => ({
        url: kotlinPath(KotlinAuthEndpoints.deactivateAccount, { accountCode }),
        method: "POST",
      }),
    }),
    getAvailableModules: build.query<AnyResp, void>({
      query: () => KotlinAuthEndpoints.availableModules,
    }),
    changePassword: build.mutation<genericResponse, AnyBody>({
      query: (body) => ({ url: KotlinAuthEndpoints.changePassword, method: "POST", body }),
    }),
    completeEnrollmentKotlin: build.mutation<genericResponse, AnyBody>({
      query: (body) => ({ url: KotlinAuthEndpoints.completeEnrollment, method: "POST", body }),
    }),
    completePasswordResetKotlin: build.mutation<genericResponse, AnyBody>({
      query: (body) => ({ url: KotlinAuthEndpoints.completePasswordReset, method: "POST", body }),
    }),
    createAccount: build.mutation<AnyResp, AnyBody>({
      query: (body) => ({ url: KotlinAuthEndpoints.createAccount, method: "POST", body }),
    }),
    initiateEnrollment: build.mutation<genericResponse, AnyBody>({
      query: (body) => ({ url: KotlinAuthEndpoints.initiateEnrollment, method: "POST", body }),
    }),
    initiatePasswordReset: build.mutation<genericResponse, AnyBody>({
      query: (body) => ({ url: KotlinAuthEndpoints.initiatePasswordReset, method: "POST", body }),
    }),
    loadAppConfig: build.query<AnyResp, void>({
      query: () => KotlinAuthEndpoints.loadConfig,
    }),
    initiateLogin: build.mutation<AnyResp, AnyBody>({
      query: (body) => ({ url: KotlinAuthEndpoints.login, method: "POST", body }),
    }),
    removeSiteMember: build.mutation<genericResponse, AnyBody>({
      query: (body) => ({ url: KotlinAuthEndpoints.removeSiteMember, method: "POST", body }),
      invalidatesTags: [{ type: ApiEnums.Member, id: "LIST" }],
    }),
    resendOtpKotlin: build.mutation<genericResponse, AnyBody>({
      query: (body) => ({ url: KotlinAuthEndpoints.resendOtp, method: "POST", body }),
    }),
    getSiteMembers: build.query<AnyResp, { siteCode: string }>({
      query: ({ siteCode }) => kotlinPath(KotlinAuthEndpoints.siteMembers, { siteCode }),
      providesTags: [{ type: ApiEnums.Member, id: "LIST" }],
    }),
    updateSiteMember: build.mutation<AnyResp, AnyBody>({
      query: (body) => ({ url: KotlinAuthEndpoints.updateSiteMember, method: "POST", body }),
      invalidatesTags: [{ type: ApiEnums.Member, id: "LIST" }],
    }),
    getUserDetails: build.query<AnyResp, void>({
      query: () => KotlinAuthEndpoints.userDetails,
    }),
  }),
});

export const {
  useInviteUserToSiteMutation,
  useAcceptInvitationMutation,
  useGetAccountMembersQuery,
  useActivateAccountMutation,
  useDeactivateAccountMutation,
  useGetAvailableModulesQuery,
  useChangePasswordMutation,
  useCompleteEnrollmentKotlinMutation,
  useCompletePasswordResetKotlinMutation,
  useCreateAccountMutation,
  useInitiateEnrollmentMutation,
  useInitiatePasswordResetMutation,
  useLoadAppConfigQuery,
  useInitiateLoginMutation,
  useRemoveSiteMemberMutation,
  useResendOtpKotlinMutation,
  useGetSiteMembersQuery,
  useUpdateSiteMemberMutation,
  useGetUserDetailsQuery,
} = authKotlinApi;

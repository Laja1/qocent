import { createApi } from "@reduxjs/toolkit/query/react";
import type {
  completeEnrollmentRequest,
  completePasswordResetRequest,
  forgotPasswordpRequest,
  invitationRequest,
  resendOtpRequest,
  signInRequest,
  signupRequest,
} from "@/models/request/authRequest";
import type {

  AccountResponse,
  signInResponse,
} from "@/models/response/authResponse";
import { kotlinBaseQueryWithResponseCodeHandling } from "../httpClient/baseQueryKotlin";
import type { genericResponse } from "@/models/response";
import { ApiEnums } from "@/utilities/enums";
import type { getAccountResponse } from "@/models/response/siteResponse";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: kotlinBaseQueryWithResponseCodeHandling,
  tagTypes:[ApiEnums.Auth],
  endpoints: (build) => ({
    signUp: build.mutation<genericResponse, signupRequest>({
      query: (body) => ({
        url: "/authentication/initiate-enrollment",
        method: "POST",
        body: body,
      }),
    }),
    signIn: build.mutation<signInResponse, signInRequest>({
      query: (body) => ({
        url: "/authentication/login",
        method: "POST",
        body: body,
      }),
    }),
    completeEnrollment: build.mutation<
      genericResponse,
      completeEnrollmentRequest
    >({
      query: (body) => ({
        url: "/authentication/complete-enrollment",
        method: "POST",
        body: body,
      }),
    }),
    resendOtp: build.mutation<genericResponse, resendOtpRequest>({
      query: (body) => ({
        url: "/authentication/resend-otp",
        method: "POST",
        body: body,
      }),
    }),
    forgotPassword: build.mutation<
      genericResponse,
      forgotPasswordpRequest
    >({
      query: (body) => ({
        url: "/authentication/initiate-password-reset",
        method: "POST",
        body: body,
      }),
    }),
    changePassword:build.mutation<genericResponse,{oldPassword:string,userPassword:string}>({
      query: (body) => ({
        url: "/authentication/change-password",
        method: "POST",
        body: body,
      }),
    }),
    completePasswordReset: build.mutation<
      genericResponse,
      completePasswordResetRequest
    >({
      query: (body) => ({
        url: "/authentication/complete-password-reset",
        method: "POST",
        body: body,
      }),
    }),
    inviteToWorkspace: build.mutation<genericResponse, invitationRequest>({
      query: (body) => ({
        url: "/authentication/invite-user",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: ApiEnums.Auth, id: "LIST" }],
    }),
    getUserAccounts: build.query<getAccountResponse, {userCode:string}>({
      query: ({userCode}) => `/authentication/user-accounts/${userCode}`,    
  }),
    getAccountMembers:build.query<AccountResponse,{accountCode:string}>({
      query:({accountCode})=>`/authentication/account-members/${accountCode}`
    }),
    acceptInvite:build.mutation<AccountResponse,{accountCode:string,userEmail:string}>({
      query:(body)=>({
        url: "/authentication/accept-invitation",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: ApiEnums.Auth, id: "LIST" }],
    }),
    
  }),
});

export const {
  useSignUpMutation,
  useCompleteEnrollmentMutation,
  useResendOtpMutation,
  useSignInMutation,
  useAcceptInviteMutation,
  useGetAccountMembersQuery,
  useForgotPasswordMutation,
  useCompletePasswordResetMutation,
  useInviteToWorkspaceMutation,
  useGetUserAccountsQuery,
} = authApi;

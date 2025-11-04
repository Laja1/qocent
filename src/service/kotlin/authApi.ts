import { createApi } from "@reduxjs/toolkit/query/react";
import type {
  acceptInvitationRequest,
  completeEnrollmentRequest,
  completePasswordResetRequest,
  forgotPasswordpRequest,
  invitationRequest,
  resendOtpRequest,
  signInRequest,
  signupRequest,
  updateMemberRequest,
  updateProfessionalServiceRequest,
} from "@/models/request/authRequest";
import type {

  AccountResponse,
  signInResponse,
} from "@/models/response/authResponse";
import { kotlinBaseQueryWithResponseCodeHandling } from "../httpClient/baseQueryKotlin";
import type { genericResponse } from "@/models/response";
import { ApiEnums } from "@/utilities/enums";
import type { getAccountResponse, getIAMRolesResponse } from "@/models/response/siteResponse";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: kotlinBaseQueryWithResponseCodeHandling,
  tagTypes:[ApiEnums.Auth,ApiEnums.Member],
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
    updateProfessionalService:build.mutation<genericResponse,updateProfessionalServiceRequest[]>({
      query: (body) => ({
        url: "/authentication/business/professional-services/update",
        method: "POST",
        body: body,
      }),
      invalidatesTags: [{ type: ApiEnums.Member, id: "LIST" }],
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
      invalidatesTags: [{ type: ApiEnums.Auth, id: "LIST" },{type:ApiEnums.Member,id:'LIST'}],
    }),
    getUserAccounts: build.query<getAccountResponse, {userCode:string}>({
      query: ({userCode}) => `/authentication/user-accounts/${userCode}`,  
      providesTags:[{type:ApiEnums.Member,id:'LIST'}]  
  }),
  getIAMRoles: build.query<getIAMRolesResponse, void>({
    query: () => `/authentication/iam/available-modules`
  
}),
  getAccountMembers: build.query<AccountResponse, { siteCode: string }>({
    query: ({ siteCode }) =>
      `/authentication/site-members/${siteCode}`,
    providesTags:[{type:ApiEnums.Member,id:'LIST'}]   
  }),  
    acceptInvite:build.mutation<AccountResponse,acceptInvitationRequest>({
      query:(body)=>({
        url: "/authentication/accept-invitation",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: ApiEnums.Member, id: "LIST" }],
      
    }),
    deleteMember:build.mutation<genericResponse,{ siteCode: string,memberUserCode: string;}>({
      query:(body)=>({
        url: "/authentication/remove-site-member",
        method: "POST",
        body:body,
      }),
      invalidatesTags: [{ type: ApiEnums.Member, id: "LIST" }],
    }),
    updateMember:build.mutation<genericResponse,updateMemberRequest>({
      query:(body)=>({
        url: "/authentication/update-site-member",
        method: "POST",
        body:body,
      }),
      invalidatesTags: [{ type: ApiEnums.Member, id: "LIST" }],
    }),
  }),
});

export const {
  useSignUpMutation,
  useCompleteEnrollmentMutation,
  useResendOtpMutation,
  useSignInMutation,
  useAcceptInviteMutation,
  useDeleteMemberMutation,
  useGetAccountMembersQuery,
  useForgotPasswordMutation,
  useCompletePasswordResetMutation,
  useInviteToWorkspaceMutation,
  useGetUserAccountsQuery,
  useGetIAMRolesQuery,
  useUpdateMemberMutation,
  useUpdateProfessionalServiceMutation,
} = authApi;

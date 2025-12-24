import { createApi } from "@reduxjs/toolkit/query/react";
import type {
  acceptInvitationRequest,
  completeEnrollmentRequest,
  completePasswordResetRequest,
  forgotPasswordpRequest,
  invitationRequest,
  resendOtpRequest,
  signInRequest,
  updateMemberRequest,
  updateProfessionalServiceRequest,
} from "@/models/request/authRequest";
import type {

  AccountResponse,
  signInResponse,
} from "@/models/response/authResponse";
import type { baseResponse, genericResponse } from "@/models/response";
import { ApiEnums } from "@/utilities/enums";
import type { getAccountResponse, getIAMRolesResponse } from "@/models/response/siteResponse";
import { baseQuery } from "../httpClient/baseQuery";
import type { CreateAccountPayload } from "@/models/request/cloudService";
import type { CreateAccountResponse } from "@/models/response/cloudServiceResponse";

export const cloudServicesApi = createApi({
  reducerPath: "cloudServices",
  baseQuery: baseQuery,
  tagTypes:[ApiEnums.Auth,ApiEnums.Member],
  endpoints: (build) => ({
    createAccount: build.mutation<CreateAccountResponse, {body:CreateAccountPayload,csp:string}>({
      query: ({body,csp}) => ({
        url: `/${csp}/create_account`,
        method: "POST",
        body: body,
      }),
    }),
    signIn: build.mutation<signInResponse, signInRequest>({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body: body,
      }),
    }),
    completeEnrollment: build.mutation<
    baseResponse,
      completeEnrollmentRequest
    >({
      query: (body) => ({
        url: "/verify-otp",
        method: "POST",
        body: body,
      }),
    }),
    sendOtp: build.mutation<genericResponse, resendOtpRequest>({
      query: (body) => ({
        url: "/send-verification",
        method: "POST",
        body: body,
      }),
    }),
    forgotPassword: build.mutation<
      baseResponse,
      forgotPasswordpRequest
    >({
      query: (body) => ({
        url: "/forgot-password",
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
      baseResponse,
      completePasswordResetRequest
    >({
      query: (body) => ({
        url: "/reset-password",
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
  getAccount: build.query<AccountResponse, { siteCode: string }>({
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
  useCreateAccountMutation,
  useCompleteEnrollmentMutation,
  useSendOtpMutation,
  useSignInMutation,
  useAcceptInviteMutation,
  useDeleteMemberMutation,
  useGetAccountQuery,
  useForgotPasswordMutation,
  useCompletePasswordResetMutation,
  useInviteToWorkspaceMutation,
  useGetUserAccountsQuery,
  useGetIAMRolesQuery,
  useUpdateMemberMutation,
  useUpdateProfessionalServiceMutation,
} = cloudServicesApi;

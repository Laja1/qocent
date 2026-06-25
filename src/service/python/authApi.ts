import { createApi } from "@reduxjs/toolkit/query/react";
import type {
  completeEnrollmentRequest,
  completePasswordResetRequest,
  forgotPasswordpRequest,
  resendOtpRequest,
  signInRequest,
  signupRequest,
  updateProfessionalServiceRequest,
  UpdatePasswordRequest,
} from "@/models/request/authRequest";
import type {
  signInResponse,
  signUpResponse,
  UpdatePasswordResponse,
} from "@/models/response/authResponse";
import type { baseResponse, genericResponse } from "@/models/response";
import { ApiEnums } from "@/utilities/enums";
import type { getAccountResponse } from "@/models/response/siteResponse";
import { baseQueryWithAuthGuard } from "../httpClient/baseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithAuthGuard,
  tagTypes:[ApiEnums.Auth,ApiEnums.Member],
  endpoints: (build) => ({
    signUp: build.mutation<signUpResponse, signupRequest>({
      query: (body) => ({
        url: "/signup",
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
    updatePassword: build.mutation<UpdatePasswordResponse, UpdatePasswordRequest>({
      query: (body) => ({
        url: "/update-password",
        method: "POST",
        body,
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
    getUserAccounts: build.query<getAccountResponse, {userCode:string}>({
      query: ({userCode}) => `/authentication/user-accounts/${userCode}`,
      providesTags:[{type:ApiEnums.Member,id:'LIST'}]
  }),
  }),
});

export const {
  useSignUpMutation,
  useCompleteEnrollmentMutation,
  useSendOtpMutation,
  useSignInMutation,
  useForgotPasswordMutation,
  useCompletePasswordResetMutation,
  useGetUserAccountsQuery,
  useUpdateProfessionalServiceMutation,
  useUpdatePasswordMutation,
} = authApi;

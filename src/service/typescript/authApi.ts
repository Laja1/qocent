import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../httpClient/baseQuery";
import type {
  completeEnrollmentRequest,
  completePasswordResetRequest,
  forgotPasswordpRequest,
  resendOtpRequest,
  signInRequest,
  signupRequest,
} from "@/models/request/authRequest";
import type {
  completeEnrollmentResponse,
  completePasswordResetResponse,
  forgotPasswordResponse,
  resendOtpResponse,
  signInResponse,
  signUpResponse,
} from "@/models/response/authResponse";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery,
  endpoints: (build) => ({
    signUp: build.mutation<signUpResponse, signupRequest>({
      query: (body) => ({
        url: "/auth/signup",
        method: "POST",
        body: body,
      }),
    }),
    signIn: build.mutation<signInResponse, signInRequest>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body: body,
      }),
    }),
    completeEnrollment: build.mutation<
      completeEnrollmentResponse,
      completeEnrollmentRequest
    >({
      query: (body) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: body,
      }),
    }),
    resendOtp: build.mutation<resendOtpResponse, resendOtpRequest>({
      query: (body) => ({
        url: "/auth/reset-passsword",
        method: "POST",
        body: body,
      }),
    }),
    forgotPassword: build.mutation<
      forgotPasswordResponse,
      forgotPasswordpRequest
    >({
      query: (body) => ({
        url: "/auth/request-password-reset",
        method: "POST",
        body: body,
      }),
    }),
    completePasswordReset: build.mutation<
      completePasswordResetResponse,
      completePasswordResetRequest
    >({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useCompleteEnrollmentMutation,
  useResendOtpMutation,
  useSignInMutation,
  useForgotPasswordMutation,
  useCompletePasswordResetMutation,
} = authApi;

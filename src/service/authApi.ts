import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithResponseCodeHandling } from './httpClient/baseQuery';
import type { completeEnrollmentRequest, completePasswordResetRequest, forgotPasswordpRequest, resendOtpRequest, signInRequest, signupRequest } from '@/pages/model/request/authRequest';
import type { completeEnrollmentResponse, completePasswordResetResponse, forgotPasswordResponse, resendOtpResponse, signInResponse, signUpResponse } from '@/pages/model/response/authResponse';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithResponseCodeHandling,
  endpoints: (build) => ({
    signUp: build.mutation<signUpResponse, signupRequest>({
      query: (body) => ({
        url: '/authentication/initiate-enrollment',
        method: 'POST',
        body: body,
      }),
    }),
    signIn: build.mutation<signInResponse, signInRequest>({
      query: (body) => ({
        url: '/authentication/login',
        method: 'POST',
        body: body,
      }),
    }),
  completeEnrollment: build.mutation<completeEnrollmentResponse, completeEnrollmentRequest>({
    query: (body) => ({
      url: '/authentication/complete-enrollment',
      method: 'POST',
      body: body,
    }),
  }),
  resendOtp:build.mutation<resendOtpResponse,resendOtpRequest>({
    query: (body) => ({
      url: '/authentication/resend-otp',
      method: 'POST',
      body: body,
    }),
  }),
  forgotPassword:build.mutation<forgotPasswordResponse,forgotPasswordpRequest>({
    query: (body) => ({
      url: '/authentication/initiate-password-reset',
      method: 'POST',
      body: body,
    }),
  }),
  completePasswordReset:build.mutation<completePasswordResetResponse,completePasswordResetRequest>({
    query: (body) => ({
      url: '/authentication/complete-password-reset',
      method: 'POST',
      body: body,
    }),
  }),
}),
});

export const { useSignUpMutation,useCompleteEnrollmentMutation,useResendOtpMutation,useSignInMutation,useForgotPasswordMutation,useCompletePasswordResetMutation } = authApi;

import { createApi } from "@reduxjs/toolkit/query/react";
import type {
  businessSignupRequest,
  completeEnrollmentRequest,
  completePasswordResetRequest,
  forgotPasswordpRequest,
  resendOtpRequest,
  signInRequest,
  signupRequest,
  UpdatePasswordRequest,
} from "@/models/request/authRequest";
import type {
  BusinessSignupResponse,
  LogoutResponse,
  signInResponse,
  signUpResponse,
  UpdatePasswordResponse,
  VerifyOTPResponse,
} from "@/models/response/authResponse";
import type { baseResponse, genericResponse } from "@/models/response";
import { ApiEnums } from "@/utilities/enums";
import { baseQueryWithAuthGuard } from "./httpClient/baseQuery";

const AUTH_PREFIX = "/auth";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithAuthGuard,
  tagTypes: [ApiEnums.Auth, ApiEnums.Member],
  endpoints: (build) => ({
    signUp: build.mutation<signUpResponse, signupRequest>({
      query: (body) => ({
        url: `${AUTH_PREFIX}/individual/signup`,
        method: "POST",
        body,
      }),
    }),

    businessSignUp: build.mutation<BusinessSignupResponse, businessSignupRequest>({
      query: (body) => ({
        url: `${AUTH_PREFIX}/business/signup`,
        method: "POST",
        body,
      }),
    }),

    signIn: build.mutation<signInResponse, signInRequest>({
      queryFn: async (body, _api, _extraOptions, baseQuery) => {
        const result = await baseQuery({
          url: `${AUTH_PREFIX}/login`,
          method: "POST",
          body,
        });

        if (result.error) {
          return { error: result.error };
        }

        const response = result.meta?.response;
        const accessToken =
          response?.headers.get("X-Access-Token") ??
          response?.headers.get("x-access-token") ??
          "";

        const data = result.data as signInResponse;

        return {
          data: {
            ...data,
            data: {
              ...data.data,
              access_token: accessToken,
            },
          },
        };
      },
    }),

    logout: build.mutation<LogoutResponse, void>({
      query: () => ({
        url: `${AUTH_PREFIX}/logout`,
        method: "POST",
      }),
    }),

    completeEnrollment: build.mutation<VerifyOTPResponse, completeEnrollmentRequest>({
      query: (body) => ({
        url: `${AUTH_PREFIX}/verify-otp`,
        method: "POST",
        body,
      }),
    }),

    sendOtp: build.mutation<genericResponse, resendOtpRequest>({
      query: (body) => ({
        url: `${AUTH_PREFIX}/resend-otp`,
        method: "POST",
        body,
      }),
    }),

    forgotPassword: build.mutation<baseResponse, forgotPasswordpRequest>({
      query: (body) => ({
        url: `${AUTH_PREFIX}/forgot-password`,
        method: "POST",
        body,
      }),
    }),

    updatePassword: build.mutation<UpdatePasswordResponse, UpdatePasswordRequest>({
      query: (body) => ({
        url: `${AUTH_PREFIX}/update-password`,
        method: "POST",
        body,
      }),
    }),

    completePasswordReset: build.mutation<
      baseResponse,
      completePasswordResetRequest
    >({
      query: (body) => ({
        url: `${AUTH_PREFIX}/reset-password`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useBusinessSignUpMutation,
  useCompleteEnrollmentMutation,
  useSendOtpMutation,
  useSignInMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useCompletePasswordResetMutation,
  useUpdatePasswordMutation,
} = authApi;

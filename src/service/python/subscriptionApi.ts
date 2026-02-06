import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuthGuard } from "../httpClient/baseQuery";
import { ApiEnums } from "@/utilities/enums";
import type {
  CreatePaidSubscriptionRequest,
  StartTrialRequest,
} from "@/models/request/subscriptionRequest";
import type {
  SubscriptionPlanListResponse,
  SubscriptionDetailResponse,
  SubscriptionListResponse,
  CreatePaidSubscriptionResponse,
  SubscriptionPaymentStatusResponse,
  SubscriptionActionResponse,
} from "@/models/response/subscriptionResponse";
import type { genericResponse } from "@/models/response";

export const subscriptionApi = createApi({
  reducerPath: "subscriptionApi",
  baseQuery: baseQueryWithAuthGuard,
  tagTypes: [ApiEnums.Subscription],
  endpoints: (build) => ({
    getAllPlans: build.query<SubscriptionPlanListResponse, { include_inactive?: boolean }>({
      query: ({ include_inactive = false }) => ({
        url: `/subscription_plans`,
        params: { include_inactive },
      }),
      providesTags: [{ type: ApiEnums.Subscription, id: "PLANS" }],
    }),

    startTrial: build.mutation<SubscriptionDetailResponse, StartTrialRequest>({
      query: ({ plan_id, trial_duration_days = 30 }) => ({
        url: `/subscriptions/trial/start`,
        method: "POST",
        params: { plan_id, trial_duration_days },
      }),
      invalidatesTags: [{ type: ApiEnums.Subscription, id: "LIST" }],
    }),

    createPaidSubscription: build.mutation<CreatePaidSubscriptionResponse, CreatePaidSubscriptionRequest>({
      query: (body) => ({
        url: `/subscriptions/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: ApiEnums.Subscription, id: "LIST" }],
    }),

    checkPaymentStatus: build.query<SubscriptionPaymentStatusResponse, string>({
      query: (subscription_id) => `/subscriptions/payment-status/${subscription_id}`,
    }),

    getTrialStatus: build.query<genericResponse, void>({
      query: () => `/subscriptions/trial/status`,
      providesTags: [{ type: ApiEnums.Subscription, id: "TRIAL" }],
    }),

    getMySubscription: build.query<SubscriptionListResponse, void>({
      query: () => `/subscriptions/me`,
      providesTags: [{ type: ApiEnums.Subscription, id: "LIST" }],
    }),

    checkSubscriptionAccess: build.query<genericResponse, void>({
      query: () => `/subscriptions/access/check`,
    }),

    getSubscription: build.query<SubscriptionDetailResponse, string>({
      query: (subscription_id) => `/subscriptions/${subscription_id}`,
      providesTags: [{ type: ApiEnums.Subscription, }],
    }),

    pauseSubscription: build.mutation<SubscriptionActionResponse, string>({
      query: (subscription_id) => ({
        url: `/subscriptions/${subscription_id}/pause`,
        method: "POST",
      }),
      invalidatesTags: [
        { type: ApiEnums.Subscription,},
        { type: ApiEnums.Subscription, id: "LIST" },
      ],
    }),

    resumeSubscription: build.mutation<SubscriptionActionResponse, string>({
      query: (subscription_id) => ({
        url: `/subscriptions/${subscription_id}/resume`,
        method: "POST",
      }),
      invalidatesTags: [
        { type: ApiEnums.Subscription, },
        { type: ApiEnums.Subscription, id: "LIST" },
      ],
    }),

    cancelSubscription: build.mutation<genericResponse, string>({
      query: (subscription_id) => ({
        url: `/subscriptions/${subscription_id}/cancel`,
        method: "POST",
      }),
      invalidatesTags: [
        { type: ApiEnums.Subscription, },
        { type: ApiEnums.Subscription, id: "LIST" },
      ],
    }),

    convertTrialToPaid: build.mutation<CreatePaidSubscriptionResponse, { subscription_id: string; payment_valid_minutes?: number }>({
      query: ({ subscription_id, payment_valid_minutes = 120 }) => ({
        url: `/subscriptions/trial/${subscription_id}/convert`,
        method: "POST",
        params: { payment_valid_minutes },
      }),
      invalidatesTags:[
        { type: ApiEnums.Subscription,  },
        { type: ApiEnums.Subscription, id: "LIST" },
      ],
    }),

    trackUsage: build.mutation<SubscriptionActionResponse, { subscription_id: string; increment?: number }>({
      query: ({ subscription_id, increment = 1 }) => ({
        url: `/subscriptions/${subscription_id}/usage/track`,
        method: "POST",
        params: { increment },
      }),
    }),
  }),
});

export const {
  useGetAllPlansQuery,
  useStartTrialMutation,
  useCreatePaidSubscriptionMutation,
  useCheckPaymentStatusQuery,
  useGetTrialStatusQuery,
  useGetMySubscriptionQuery,
  useCheckSubscriptionAccessQuery,
  useGetSubscriptionQuery,
  usePauseSubscriptionMutation,
  useResumeSubscriptionMutation,
  useCancelSubscriptionMutation,
  useConvertTrialToPaidMutation,
  useTrackUsageMutation,
} = subscriptionApi;

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuthGuard } from "./httpClient/baseQuery";
import { ApiEnums } from "@/utilities/enums";
import type {
  CreatePaidSubscriptionRequest,
  StartTrialRequest,
} from "@/models/request/subscriptionRequest";
import type {
  SubscriptionPlanListResponse,
  SubscriptionListResponse,
  CreatePaidSubscriptionResponse,
  SubscriptionPaymentStatusResponse,
  SubscriptionActionResponse,
  SubscriptionDetailResponse,
} from "@/models/response/subscriptionResponse";

export const subscriptionApi = createApi({
  reducerPath: "subscriptionApi",
  baseQuery: baseQueryWithAuthGuard,
  tagTypes: [ApiEnums.Subscription],
  endpoints: (build) => ({
    getAllWithMySubscriptions: build.query<SubscriptionPlanListResponse, void>({
      query: () => ({ url: `/subscription_plans/me` }),
      providesTags: [
        { type: ApiEnums.Subscription, id: "PLANS" },
        { type: ApiEnums.Subscription, id: "LIST" },
      ],
    }),

    startTrial: build.mutation<SubscriptionDetailResponse, StartTrialRequest>({
      query: ({ plan_id, trial_duration_days = 30 }) => ({
        url: `/subscriptions/trial/start`,
        method: "POST",
        params: { plan_id, trial_duration_days },
      }),
      invalidatesTags: [
        { type: ApiEnums.Subscription, id: "LIST" },
        { type: ApiEnums.Subscription, id: "PLANS" },
      ],
    }),

    createPaidSubscription: build.mutation<CreatePaidSubscriptionResponse, CreatePaidSubscriptionRequest>({
      query: (body) => ({
        url: `/subscriptions/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: [
        { type: ApiEnums.Subscription, id: "LIST" },
        { type: ApiEnums.Subscription, id: "PLANS" },
      ],
    }),

    checkPaymentStatus: build.query<SubscriptionPaymentStatusResponse, string>({
      query: (payment_id) => `/subscriptions/payment-status/${payment_id}`,
      providesTags: [{ type: ApiEnums.Subscription, id: "PAYMENT" }],
    }),

    getMySubscription: build.query<SubscriptionListResponse, void>({
      query: () => `/subscriptions/me`,
      providesTags: [{ type: ApiEnums.Subscription, id: "LIST" }],
    }),

    getTrialStatus: build.query<SubscriptionDetailResponse, void>({
      query: () => `/subscriptions/trial/status`,
      providesTags: [{ type: ApiEnums.Subscription, id: "TRIAL" }],
    }),

    checkSubscriptionAccess: build.query<{ has_access: boolean; message?: string }, void>({
      query: () => `/subscriptions/access/check`,
      providesTags: [{ type: ApiEnums.Subscription, id: "ACCESS" }],
    }),

    getSubscriptionById: build.query<SubscriptionDetailResponse, string>({
      query: (subscription_id) => `/subscriptions/${subscription_id}`,
      providesTags: (_result, _error, id) => [{ type: ApiEnums.Subscription, id }],
    }),

    pauseSubscription: build.mutation<SubscriptionActionResponse, string>({
      query: (subscription_id) => ({
        url: `/subscriptions/${subscription_id}/pause`,
        method: "POST",
      }),
      invalidatesTags: [
        { type: ApiEnums.Subscription },
        { type: ApiEnums.Subscription, id: "LIST" },
      ],
    }),

    resumeSubscription: build.mutation<SubscriptionActionResponse, string>({
      query: (subscription_id) => ({
        url: `/subscriptions/${subscription_id}/resume`,
        method: "POST",
      }),
      invalidatesTags: [
        { type: ApiEnums.Subscription },
        { type: ApiEnums.Subscription, id: "LIST" },
      ],
    }),

    cancelSubscription: build.mutation<void, string>({
      query: (subscription_id) => ({
        url: `/subscriptions/${subscription_id}/cancel`,
        method: "POST",
      }),
      invalidatesTags: [
        { type: ApiEnums.Subscription },
        { type: ApiEnums.Subscription, id: "LIST" },
      ],
    }),

    convertTrialToPaid: build.mutation<CreatePaidSubscriptionResponse, { subscription_id: string; payment_valid_minutes?: number }>({
      query: ({ subscription_id, payment_valid_minutes = 120 }) => ({
        url: `/subscriptions/trial/${subscription_id}/convert`,
        method: "POST",
        params: { payment_valid_minutes },
      }),
      invalidatesTags: [
        { type: ApiEnums.Subscription },
        { type: ApiEnums.Subscription, id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllWithMySubscriptionsQuery,
  useStartTrialMutation,
  useCreatePaidSubscriptionMutation,
  useCheckPaymentStatusQuery,
  useLazyCheckPaymentStatusQuery,
  useGetMySubscriptionQuery,
  useGetTrialStatusQuery,
  useCheckSubscriptionAccessQuery,
  useGetSubscriptionByIdQuery,
  usePauseSubscriptionMutation,
  useResumeSubscriptionMutation,
  useCancelSubscriptionMutation,
  useConvertTrialToPaidMutation,
} = subscriptionApi;

export { useGetServiceAccessMutation } from "./contextApi";

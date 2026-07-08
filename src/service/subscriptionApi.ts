import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuthGuard } from "./httpClient/baseQuery";
import { ApiEnums } from "@/utilities/enums";
import type { CreatePaidSubscriptionRequest } from "@/models/request/subscriptionRequest";
import type {
  GenericResponse,
  SubscriptionPlanListResponse,
  SubscriptionListResponse,
  SubscriptionDetailResponse,
  SubscriptionActionResponse,
  TrialStatusResponse,
} from "@/models/response/subscriptionResponse";

export const subscriptionApi = createApi({
  reducerPath: "subscriptionApi",
  baseQuery: baseQueryWithAuthGuard,
  tagTypes: [ApiEnums.Subscription],
  endpoints: (build) => ({
    getAllPlans: build.query<SubscriptionPlanListResponse, { include_inactive?: boolean } | void>({
      query: (arg) => ({
        url: `/subscription_plans`,
        params: arg?.include_inactive ? { include_inactive: arg.include_inactive } : undefined,
      }),
      providesTags: [{ type: ApiEnums.Subscription, id: "PLANS" }],
    }),

    getAllWithMySubscriptions: build.query<SubscriptionPlanListResponse, void>({
      query: () => ({ url: `/subscription_plans/me` }),
      providesTags: [
        { type: ApiEnums.Subscription, id: "PLANS" },
        { type: ApiEnums.Subscription, id: "LIST" },
      ],
    }),

    startTrial: build.mutation<SubscriptionDetailResponse, { plan_id: string }>({
      query: ({ plan_id }) => ({
        url: `/subscriptions/trial/start`,
        method: "POST",
        params: { plan_id },
      }),
      invalidatesTags: [
        { type: ApiEnums.Subscription, id: "LIST" },
        { type: ApiEnums.Subscription, id: "PLANS" },
        { type: ApiEnums.Subscription, id: "TRIAL" },
      ],
    }),

    subscribe: build.mutation<SubscriptionDetailResponse, CreatePaidSubscriptionRequest>({
      query: (body) => ({
        url: `/subscriptions/subscribe`,
        method: "POST",
        body,
      }),
      invalidatesTags: [
        { type: ApiEnums.Subscription, id: "LIST" },
        { type: ApiEnums.Subscription, id: "PLANS" },
      ],
    }),

    getMySubscription: build.query<SubscriptionListResponse, void>({
      query: () => `/subscriptions/me`,
      providesTags: [{ type: ApiEnums.Subscription, id: "LIST" }],
    }),

    getTrialStatus: build.query<TrialStatusResponse, void>({
      query: () => `/subscriptions/trial/status`,
      providesTags: [{ type: ApiEnums.Subscription, id: "TRIAL" }],
    }),

    checkSubscriptionAccess: build.query<GenericResponse, void>({
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

    cancelSubscription: build.mutation<GenericResponse, string>({
      query: (subscription_id) => ({
        url: `/subscriptions/${subscription_id}/cancel`,
        method: "POST",
      }),
      invalidatesTags: [
        { type: ApiEnums.Subscription },
        { type: ApiEnums.Subscription, id: "LIST" },
      ],
    }),

    convertTrialToPaid: build.mutation<SubscriptionDetailResponse, string>({
      query: (subscription_id) => ({
        url: `/subscriptions/trial/${subscription_id}/convert`,
        method: "POST",
      }),
      invalidatesTags: [
        { type: ApiEnums.Subscription },
        { type: ApiEnums.Subscription, id: "LIST" },
        { type: ApiEnums.Subscription, id: "TRIAL" },
      ],
    }),
  }),
});

export const {
  useGetAllPlansQuery,
  useGetAllWithMySubscriptionsQuery,
  useStartTrialMutation,
  useSubscribeMutation,
  useGetMySubscriptionQuery,
  useGetTrialStatusQuery,
  useCheckSubscriptionAccessQuery,
  useGetSubscriptionByIdQuery,
  usePauseSubscriptionMutation,
  useResumeSubscriptionMutation,
  useCancelSubscriptionMutation,
  useConvertTrialToPaidMutation,
} = subscriptionApi;

/** @deprecated Use useSubscribeMutation — subscriptions debit wallet directly */
export const useCreatePaidSubscriptionMutation = useSubscribeMutation;

export { useGetServiceAccessMutation } from "./contextApi";

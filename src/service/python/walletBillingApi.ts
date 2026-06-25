import { ApiEnums } from "@/utilities/enums";
import type {
  FundWalletRequest,
} from "@/models/request/walletBillingRequest";
import type {
  FundWalletResponse,
  MyBillsResponse,
  SpendReportResponse,
  WalletBalanceResponse,
  WalletFundingStatusResponse,
  WalletTransactionResponse,
} from "@/models/response/walletBillingResponse";
import type { CreatePaidSubscriptionRequest } from "@/models/request/subscriptionRequest";
import type {
  CreatePaidSubscriptionResponse,
  SubscriptionPaymentStatusResponse,
} from "@/models/response/subscriptionResponse";
import { pythonBaseApi } from "./baseApi";

export const walletBillingApi = pythonBaseApi.injectEndpoints({
  endpoints: (build) => ({
    getWalletBalance: build.query<WalletBalanceResponse, void>({
      query: () => ({
        url: "/wallet/balance",
      }),
      providesTags: [{ type: ApiEnums.Wallet, id: "BALANCE" }],
    }),

    getWalletTransactions: build.query<
      WalletTransactionResponse[],
      { limit?: number } | void
    >({
      query: (arg) => ({
        url: "/wallet/transactions",
        params: { limit: arg?.limit ?? 50 },
      }),
      providesTags: [{ type: ApiEnums.Wallet, id: "TRANSACTIONS" }],
    }),

    fundWallet: build.mutation<FundWalletResponse, FundWalletRequest>({
      query: (body) => ({
        url: "/wallet/fund",
        method: "POST",
        body,
      }),
    }),

    checkWalletFundingStatus: build.query<WalletFundingStatusResponse, string>({
      query: (payment_id) => ({
        url: `/wallet/funding-status/${payment_id}`,
      }),
      providesTags: [{ type: ApiEnums.Wallet, id: "BALANCE" }],
    }),

    getSpendReport: build.query<
      SpendReportResponse,
      { start_date?: string | null; end_date?: string | null } | void
    >({
      query: (arg) => ({
        url: "/billing/spend-report",
        params: {
          start_date: arg?.start_date,
          end_date: arg?.end_date,
        },
      }),
      providesTags: [{ type: ApiEnums.BillingSpend, id: "REPORT" }],
    }),

    getMyBills: build.query<MyBillsResponse, void>({
      query: () => ({
        url: "/billing/my-bills",
      }),
      providesTags: [{ type: ApiEnums.BillingSpend, id: "BILLS" }],
    }),

    getWalletDetails: build.query<WalletBalanceResponse, void>({
      query: () => ({
        url: "/wallet/me",
      }),
      providesTags: [{ type: ApiEnums.Wallet, id: "DETAILS" }],
    }),

    startPersonalTrial: build.mutation<
      void,
      { plan_id: string; trial_duration_days?: number }
    >({
      query: ({ plan_id, trial_duration_days = 30 }) => ({
        url: "/wallet/subscribe/trial",
        method: "POST",
        params: { plan_id, trial_duration_days },
      }),
      invalidatesTags: [
        { type: ApiEnums.Subscription, id: "LIST" },
        { type: ApiEnums.Subscription, id: "PLANS" },
      ],
    }),

    createPersonalPaidSubscription: build.mutation<
      CreatePaidSubscriptionResponse,
      CreatePaidSubscriptionRequest
    >({
      query: (body) => ({
        url: "/wallet/subscribe/paid",
        method: "POST",
        body,
      }),
      invalidatesTags: [
        { type: ApiEnums.Subscription, id: "LIST" },
        { type: ApiEnums.Subscription, id: "PLANS" },
      ],
    }),

    convertPersonalTrialToPaid: build.mutation<
      CreatePaidSubscriptionResponse,
      { subscription_id: string; payment_valid_minutes?: number }
    >({
      query: (body) => ({
        url: "/wallet/subscribe/convert-trial",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: ApiEnums.Subscription, id: "LIST" }],
    }),

    checkPersonalPaymentStatus: build.query<
      SubscriptionPaymentStatusResponse,
      string
    >({
      query: (payment_id) => ({
        url: `/wallet/subscribe/payment-status/${payment_id}`,
      }),
      providesTags: [{ type: ApiEnums.Subscription, id: "PAYMENT" }],
    }),

    startBusinessTrial: build.mutation<
      void,
      { business_id: string; plan_id: string; trial_duration_days?: number }
    >({
      query: ({ business_id, plan_id, trial_duration_days }) => ({
        url: `/wallet/business/${business_id}/subscribe/trial`,
        method: "POST",
        params: { plan_id, ...(trial_duration_days ? { trial_duration_days } : {}) },
      }),
      invalidatesTags: [
        { type: ApiEnums.Subscription, id: "LIST" },
        { type: ApiEnums.Subscription, id: "PLANS" },
      ],
    }),

    createBusinessPaidSubscription: build.mutation<
      CreatePaidSubscriptionResponse,
      { business_id: string; body: CreatePaidSubscriptionRequest }
    >({
      query: ({ business_id, body }) => ({
        url: `/wallet/business/${business_id}/subscribe/paid`,
        method: "POST",
        body,
      }),
      invalidatesTags: [
        { type: ApiEnums.Subscription, id: "LIST" },
        { type: ApiEnums.Subscription, id: "PLANS" },
      ],
    }),

    convertBusinessTrialToPaid: build.mutation<
      CreatePaidSubscriptionResponse,
      { business_id: string; subscription_id: string; payment_valid_minutes?: number }
    >({
      query: ({ business_id, subscription_id, payment_valid_minutes }) => ({
        url: `/wallet/business/${business_id}/subscribe/convert-trial`,
        method: "POST",
        body: { subscription_id, ...(payment_valid_minutes ? { payment_valid_minutes } : {}) },
      }),
      invalidatesTags: [{ type: ApiEnums.Subscription, id: "LIST" }],
    }),

    checkBusinessPaymentStatus: build.query<
      SubscriptionPaymentStatusResponse,
      { business_id: string; payment_id: string }
    >({
      query: ({ business_id, payment_id }) => ({
        url: `/wallet/business/${business_id}/subscribe/payment-status/${payment_id}`,
      }),
      providesTags: [{ type: ApiEnums.Subscription, id: "PAYMENT" }],
    }),
  }),
});

export const {
  useGetWalletBalanceQuery,
  useGetWalletTransactionsQuery,
  useFundWalletMutation,
  useCheckWalletFundingStatusQuery,
  useGetSpendReportQuery,
  useGetMyBillsQuery,
  useGetWalletDetailsQuery,
  useStartPersonalTrialMutation,
  useCreatePersonalPaidSubscriptionMutation,
  useConvertPersonalTrialToPaidMutation,
  useCheckPersonalPaymentStatusQuery,
  useStartBusinessTrialMutation,
  useCreateBusinessPaidSubscriptionMutation,
  useConvertBusinessTrialToPaidMutation,
  useCheckBusinessPaymentStatusQuery,
} = walletBillingApi;

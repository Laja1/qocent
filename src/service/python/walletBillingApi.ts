import { ApiEnums } from "@/utilities/enums";
import type {
  FundWalletRequest,
  SetPostpaidConfigRequest,
} from "@/models/request/walletBillingRequest";
import type {
  DailySpendSyncResponse,
  FundWalletResponse,
  MyBillsResponse,
  SetPostpaidConfigResponse,
  SpendReportResponse,
  WalletBalanceResponse,
  WalletFundingStatusResponse,
  WalletTransactionResponse,
} from "@/models/response/walletBillingResponse";
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

    syncDailySpend: build.mutation<
      DailySpendSyncResponse,
      { account_id: string; hyperscaler?: string | null }
    >({
      query: ({ account_id, hyperscaler }) => ({
        url: "/billing/sync-daily-spend",
        method: "POST",
        params: { account_id, hyperscaler },
      }),
      invalidatesTags: [{ type: ApiEnums.BillingSpend, id: "REPORT" }],
    }),

    getMyBills: build.query<MyBillsResponse, void>({
      query: () => ({
        url: "/billing/my-bills",
      }),
      providesTags: [{ type: ApiEnums.BillingSpend, id: "BILLS" }],
    }),

    setPostpaidConfig: build.mutation<
      SetPostpaidConfigResponse,
      { user_id: string; account_id: string; body: SetPostpaidConfigRequest }
    >({
      query: ({ user_id, account_id, body }) => ({
        url: `/billing/users/${user_id}/postpaid-config`,
        method: "POST",
        params: { account_id },
        body,
      }),
      invalidatesTags: [{ type: ApiEnums.BillingSpend, id: "BILLS" }],
    }),
  }),
});

export const {
  useGetWalletBalanceQuery,
  useGetWalletTransactionsQuery,
  useFundWalletMutation,
  useCheckWalletFundingStatusQuery,
  useGetSpendReportQuery,
  useSyncDailySpendMutation,
  useGetMyBillsQuery,
  useSetPostpaidConfigMutation,
} = walletBillingApi;

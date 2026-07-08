import { ApiEnums } from "@/utilities/enums";
import type { FundWalletRequest } from "@/models/request/walletBillingRequest";
import type {
  BalanceVsSpendResponse,
  ExchangeRateResponse,
  FundWalletResponse,
  MyBillsResponse,
  SpendOverTimeResponse,
  SpendReportResponse,
  TotalSpendResponse,
  WalletBalanceResponse,
  WalletMeResponse,
  WalletTransactionListResponse,
} from "@/models/response/walletBillingResponse";
import { pythonBaseApi } from "./pythonBaseApi";

export const walletBillingApi = pythonBaseApi.injectEndpoints({
  endpoints: (build) => ({
    getWalletMe: build.query<WalletMeResponse, void>({
      query: () => ({
        url: "/wallet/me",
      }),
      providesTags: [{ type: ApiEnums.Wallet, id: "DETAILS" }],
    }),

    getWalletBalance: build.query<
      WalletBalanceResponse,
      { force_recalculate?: boolean } | void
    >({
      query: (arg) => ({
        url: "/wallet/balance",
        params: arg?.force_recalculate
          ? { force_recalculate: arg.force_recalculate }
          : undefined,
      }),
      providesTags: [{ type: ApiEnums.Wallet, id: "BALANCE" }],
    }),

    getWalletTransactions: build.query<
      WalletTransactionListResponse,
      { limit?: number; offset?: number } | void
    >({
      query: (arg) => ({
        url: "/wallet/transactions",
        params: {
          limit: arg?.limit ?? 50,
          ...(arg?.offset != null ? { offset: arg.offset } : {}),
        },
      }),
      providesTags: [{ type: ApiEnums.Wallet, id: "TRANSACTIONS" }],
    }),

    getBalanceVsSpend: build.query<
      BalanceVsSpendResponse,
      { period_days?: number } | void
    >({
      query: (arg) => ({
        url: "/wallet/balance-vs-spend",
        params: arg?.period_days ? { period_days: arg.period_days } : undefined,
      }),
      providesTags: [{ type: ApiEnums.Wallet, id: "BALANCE" }],
    }),

    fundWallet: build.mutation<FundWalletResponse, FundWalletRequest>({
      query: (body) => ({
        url: "/wallet/fund",
        method: "POST",
        body,
      }),
    }),

    getSpendReport: build.query<
      SpendReportResponse,
      {
        account_id: string;
        start_date?: string | null;
        end_date?: string | null;
      }
    >({
      query: ({ account_id, start_date, end_date }) => ({
        url: "/billing/spend-report",
        params: { account_id, start_date, end_date },
      }),
      providesTags: [{ type: ApiEnums.BillingSpend, id: "REPORT" }],
    }),

    getMyBills: build.query<
      MyBillsResponse | TotalSpendResponse,
      {
        hyperscaler?: string | null;
        start_date?: string | null;
        end_date?: string | null;
        status?: string | null;
        detailed?: boolean;
        limit?: number;
        offset?: number;
      } | void
    >({
      query: (arg) => ({
        url: "/billing/my-bills",
        params: arg ?? undefined,
      }),
      providesTags: [{ type: ApiEnums.BillingSpend, id: "BILLS" }],
    }),

    getMySpend: build.query<
      SpendOverTimeResponse,
      {
        hyperscaler?: string | null;
        start_date?: string | null;
        end_date?: string | null;
        group_by?: "daily" | "monthly";
      } | void
    >({
      query: (arg) => ({
        url: "/billing/my-spend",
        params: arg ?? undefined,
      }),
      providesTags: [{ type: ApiEnums.BillingSpend, id: "SPEND" }],
    }),

    getCurrentExchangeRate: build.query<
      ExchangeRateResponse,
      { base?: string; quote?: string } | void
    >({
      query: (arg) => ({
        url: "/exchange-rates/current",
        params: {
          base: arg?.base ?? "USD",
          quote: arg?.quote ?? "NGN",
        },
      }),
    }),
  }),
});

export const {
  useGetWalletMeQuery,
  useGetWalletBalanceQuery,
  useGetWalletTransactionsQuery,
  useGetBalanceVsSpendQuery,
  useFundWalletMutation,
  useGetSpendReportQuery,
  useGetMyBillsQuery,
  useGetMySpendQuery,
  useGetCurrentExchangeRateQuery,
} = walletBillingApi;

/** @deprecated Use useGetWalletMeQuery */
export const useGetWalletDetailsQuery = useGetWalletMeQuery;

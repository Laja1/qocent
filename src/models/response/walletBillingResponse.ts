export type WalletBalanceResponse = {
  balance: number;
  currency?: string;
};

export type WalletTransactionResponse = {
  entry_id: string;
  transaction_type: string;
  amount: number;
  balance_after: number;
  description?: string | null;
  reference_id?: string | null;
  reference_type?: string | null;
  created_at: string;
  currency?: string;
};

export type FundWalletResponse = {
  message?: string | null;
  payment_id: string;
  reference: string;
  account_number: string;
  bank_name: string;
  account_name: string;
  amount: number;
  valid_until: string;
  instructions: string;
};

export type WalletFundingStatusResponse = {
  payment_id: string;
  reference: string;
  status: "PENDING" | "PAID" | "FAILED" | "EXPIRED" | string;
  amount: string | number;
  currency: string;
  method: string;
  created_at: string;
  updated_at: string;
} & Record<string, unknown>;

export type SpendReportResponse = {
  spend: Record<string, number | string>;
  grand_total: number;
  currency: string;
  total_users_with_spend: number;
} & Record<string, unknown>;

export type Bill = {
  bill_id?: string;
  amount?: number | string;
  currency?: string;
  status?: string;
  due_date?: string;
  created_at?: string;
  description?: string;
} & Record<string, unknown>;

export type MyBillsResponse = {
  bills: Bill[];
} & Record<string, unknown>;

export type DailySpendSyncResponse = Record<string, unknown>;
export type SetPostpaidConfigResponse = Record<string, unknown>;

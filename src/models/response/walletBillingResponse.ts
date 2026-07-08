export type WalletBalanceResponse = {
  balance: number;
  currency?: string;
};

export type WalletMeResponse = {
  wallet_id: string;
  user_email: string;
  balance: number;
  currency?: string;
  status: string;
  created_at: string;
  last_updated_at?: string | null;
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

export type WalletTransactionListResponse = {
  status?: string;
  message?: string;
  total: number;
  data: WalletTransactionResponse[];
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

export type BalanceVsSpendResponse = {
  currency?: string;
  wallet_balance: number;
  cloud_spend_in_period: number;
  period_days: number;
  period_start: string;
  period_end: string;
};

export type SpendReportResponse = {
  spend: Record<string, number>;
  grand_total: number;
  currency: string;
  total_accounts_with_spend: number;
  period?: {
    start: string;
    end: string;
  };
};

export type BillResponse = {
  bill_id: string;
  account_id: string;
  user_id: string;
  hyperscaler: string;
  total_amount: number;
  currency: string;
  status: string;
  billing_period_start: string;
  billing_period_end: string;
  due_date: string;
  created_at: string;
};

export type TotalSpendResponse = {
  total_amount: number;
  currency?: string;
  hyperscaler?: string;
  period: string;
  status_filter?: string | null;
};

export type MyBillsResponse = TotalSpendResponse | BillResponse[];

export type SpendOverTimeResponse = {
  hyperscaler?: string;
  period: string;
  group_by: string;
  spend: Array<{ date: string; amount: number }>;
  total_spent: number;
  currency?: string;
};

export type ExchangeRateResponse = {
  base_currency: string;
  quote_currency: string;
  rate: number;
  rate_date: string;
  effective_date: string;
  source?: string | null;
  as_of: string;
};

export type WalletFundingStatusResponse = {
  payment_id: string;
  reference: string;
  status: string;
  amount: string | number;
  currency: string;
  method?: string;
  created_at?: string;
  updated_at?: string;
};

export type DailySpendSyncResponse = Record<string, unknown>;
export type SetPostpaidConfigResponse = Record<string, unknown>;

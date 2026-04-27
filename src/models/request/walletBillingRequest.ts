export type FundWalletRequest = {
  amount: number | string;
};

export type SetPostpaidConfigRequest = {
  credit_limit: number | string;
  grace_period_months: number;
};

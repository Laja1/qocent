export type CreatePaidSubscriptionRequest = {
  plan_id: string;
  billing_cycle?: "MONTHLY" | "QUARTERLY" | "YEARLY";
};

export type StartTrialRequest = {
  plan_id: string;
  trial_duration_days?: number;
};

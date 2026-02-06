export type SubscriptionPlanResponse = {
  subscription_plan_id: string;
  subscription_plan_name: string;
  subscription_plan_description: string | null;
  subscription_plan_monthly_price: string;
  subscription_plan_yearly_price: string;
  subscription_plan_yearly_discount: string | null;
  subscription_plan_currency: string;
  subscription_plan_features: Record<string, string> | null;
  subscription_plan_is_active: boolean;
  subscription_plan_created_at: string;
  subscription_plan_updated_at: string;
};

export type SubscriptionPlanListResponse = {
  data: SubscriptionPlanResponse[];
  message: string;
  status: string;
};

export type SubscriptionResponse = {
  subscription_id: string;
  subscription_user_id: string;
  subscription_plan_id: string;
  subscription_status: string;
  subscription_billing_cycle: string;
  subscription_usage_count: number;
  subscription_is_trial: boolean;
  subscription_trial_ends_at: string | null;
  subscription_started_at: string | null;
  subscription_ends_at: string | null;
  subscription_created_at: string;
  subscription_updated_at: string;
};

export type SubscriptionDetailResponse = {
  data: SubscriptionResponse;
  message: string;
  status: string;
};

export type SubscriptionListResponse = {
  data: SubscriptionResponse[];
  message: string;
  status: string;
};

export type CreatePaidSubscriptionResponse = {
  subscription_id: string;
  payment_id: string;
  payment_reference: string;
  account_number: string;
  bank_name: string;
  account_name: string;
  amount: number;
  currency: string;
  valid_until: string;
  expires_in_minutes: number;
  status: string;
  payment_instructions: string;
  message: string;
};

export type SubscriptionPaymentStatusResponse = {
  subscription_id: string;
  active: boolean;
  subscription_status: string;
  payment_status: string | null;
  message: string;
  status: string;
};

export type SubscriptionActionResponse = {
  status: string;
  message: string;
  data?: SubscriptionResponse | null;
};

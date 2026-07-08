export type SubscriptionPlanResponse = {
  subscription_plan_id: string;
  subscription_plan_name: string;
  subscription_plan_description: string | null;
  subscription_plan_monthly_price: string;
  subscription_plan_yearly_price: string;
  subscription_plan_yearly_discount: string | null;
  subscription_plan_currency: string;
  subscription_plan_features: Record<string, string> | null;
  subscription_plan_trial_duration_days?: number;
  subscription_plan_is_active: boolean;
  subscription_plan_created_at?: string;
  subscription_plan_updated_at?: string;
  subscription_started_at?: string | null;
  subscription_ends_at?: string | null;
  subscription_type?: string | null;
};

export type SubscriptionPlanListResponse = {
  data: SubscriptionPlanResponse[];
  message: string;
  status: string;
};

export type SubscriptionResponse = {
  subscription_id: string;
  subscription_owner_type: string;
  subscription_owner_id: string;
  subscription_user_id?: string | null;
  subscription_business_id?: string | null;
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

export type SubscriptionActionResponse = {
  status: string;
  message: string;
  data?: SubscriptionResponse | null;
};

export type GenericResponse = {
  status: string;
  message: string;
  data?: unknown;
};

export type TrialStatusData = {
  has_subscription: boolean;
  is_trial: boolean;
  subscription_status?: string | null;
  trial_ends_at?: string | null;
  days_remaining?: number | null;
  is_expired?: boolean | null;
  message: string;
};

export type TrialStatusResponse = {
  status: string;
  message: string;
  data: TrialStatusData;
};

export type ServiceAccessResponse = {
  status: string;
  message: string;
  data: {
    redirect_url: string;
    service: string;
    expires_in_seconds: number;
  };
};

export type ContextType = 'personal' | 'business';
export type ContextRole = 'PERSONAL' | 'OWNER' | 'MEMBER' | 'VIEWER';
export type WalletStatus = 'ACTIVE' | 'FROZEN' | 'NOT_CREATED';

export interface ContextItem {
  context_type: ContextType;
  entity_id: string;
  display_name: string;
  role: ContextRole;
  wallet_id?: string | null;
  current_balance: number;
  currency: string;
  wallet_status: WalletStatus;
  active_services: string[];
  available_services: string[];
  can_fund: boolean;
  can_view_finops: boolean;
  has_active_subscription: boolean;
}

export interface ContextListResponse {
  data: ContextItem[];
  total: number;
  message?: string;
}

export interface SelectContextRequest {
  context_type: ContextType;
  entity_id: string;
}

export interface SelectContextResponse {
  active_context: ContextItem;
  token_context_claim: string;
  message: string;
}

export interface ActiveContextResponse {
  active_context: ContextItem;
  message: string;
}

export interface ServiceRedirectData {
  redirect_url: string;
  token: string;
  service: string;
  expires_in_seconds: number;
  context_type: ContextType;
  entity_id: string;
  role: ContextRole;
}

export interface ServiceRedirectResponse {
  status: string;
  message: string;
  data: ServiceRedirectData;
}

export interface ServiceInfo {
  service_name: string;
  display_name: string;
  description?: string;
}

export interface ServiceListResponse {
  data: ServiceInfo[];
}

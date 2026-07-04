export type InviteStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED';
export type InitiatedBy = 'BUSINESS' | 'USER';
export type ProposedRole = 'MEMBER' | 'VIEWER';
export type Csp = 'aws' | 'huawei';

export interface BusinessInviteResponse {
  invite_id: string;
  business_id: string;
  user_id: string;
  initiated_by: InitiatedBy;
  proposed_role: ProposedRole;
  status: InviteStatus;
  message?: string | null;
  created_at: string;
  updated_at: string;
  expires_at?: string | null;
  cloud_account_provisioned?: boolean;
  csp?: string | null;
}

export interface BusinessInviteListResponse {
  data: BusinessInviteResponse[];
  total: number;
  message?: string;
}

export interface InviteActionResponse {
  message: string;
  invite_id: string;
  status: InviteStatus;
  cloud_account_id?: string | null;
  cloud_provider?: string | null;
  login_url_available?: boolean;
}

export interface CloudAccountResponse {
  status: string;
  message: string;
  account_id: string;
  org_id: string;
  member_type: string;
  login_url: string;
  csp: Csp;
}

export interface CloudLoginUrlResponse {
  status: string;
  message: string;
  account_id: string;
  csp: Csp;
}

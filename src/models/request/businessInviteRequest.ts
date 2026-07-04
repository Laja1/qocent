import type { Csp, ProposedRole } from '../response/businessInviteResponse';

export interface BusinessInviteUserRequest {
  user_email: string;
  proposed_role: ProposedRole;
  message?: string;
}

export interface UserRequestJoinRequest {
  business_slug_or_name: string;
  message?: string;
}

export interface UserRespondToInvitePayload {
  action: 'ACCEPT' | 'REJECT';
}

export interface BusinessRespondToRequestPayload {
  action: 'ACCEPT' | 'REJECT';
  proposed_role?: ProposedRole;
}

export interface CreateCloudAccountRequest {
  csp: Csp;
  account_name?: string;
}

import type { MemberType } from "../response/invitationResponse";

export interface SendInvitationRequest {
  account_id: string;
  user_email: string;
  role?: MemberType;
  message?: string | null;
}

/** @deprecated Use SendInvitationRequest */
export interface CreateInvitationRequest {
  recipient_identifier: string;
  role?: MemberType;
  expires_in_hours?: number;
}

export interface AcceptInvitationRequest {
  invite_id: string;
}

export interface RejectInvitationRequest {
  invite_id: string;
}

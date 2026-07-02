import type { MemberType } from "../response/invitationResponse";

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

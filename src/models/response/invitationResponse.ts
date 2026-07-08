export type MemberType = "Admin" | "Member" | "Viewer";

export type InvitationStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "REVOKED"
  | "EXPIRED"
  | string;

export type InvitationData = {
  invite_id: string;
  business_id: string;
  business_display_name?: string | null;
  account_id?: string | null;
  account_name?: string | null;
  account_provider?: string | null;
  user_id: string;
  user_email?: string | null;
  user_full_name?: string | null;
  role: MemberType | string;
  status: InvitationStatus;
  message?: string | null;
  created_at?: string | null;
  expires_at?: string | null;
  actioned_by_user_id?: string | null;
};

/** @deprecated Use InvitationData */
export type InvitationResponseData = InvitationData;

export type InvitationAPIResponse = {
  status?: string;
  message: string;
  data: InvitationData;
};

export type InvitationListAPIResponse = {
  status?: string;
  message?: string;
  total: number;
  data: InvitationData[];
};

export type SendInvitationResponse = {
  status?: string;
  message: string;
};

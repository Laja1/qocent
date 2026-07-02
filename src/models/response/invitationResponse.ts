export type MemberType = "Admin" | "Member" | "Viewer";

export type InvitationStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "REVOKED"
  | "EXPIRED"
  | string;

export type InvitationResponseData = {
  invite_id: string;
  invite_sender_id: string;
  invite_recipient_id: string;
  invite_account_id: string;
  invite_user_role: MemberType | string;
  invite_status: InvitationStatus;
  invite_created_at: string;
  invite_expires_at: string;
};

export type InvitationAPIResponse = {
  status: string;
  message: string;
  data?: InvitationResponseData | InvitationResponseData[] | null;
};

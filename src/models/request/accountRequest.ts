export type UpdateAccountRequest = {
  account_name?: string | null;
};

export type AccountMembershipPayload = {
  user_id?: string;
  account_member_id?: string;
  member_type: string;
};

export type TransferAdminRequest = {
  user_id: string;
};

export type DeleteMemberPayload = {
  user_id: string;
};

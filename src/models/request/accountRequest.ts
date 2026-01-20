export type UpdateAccountPayload = {
    account_name?: string;
    account_status?: string;
};

export type AccountMembershipPayload = {
    account_member_id: string;
    member_type: string;
};

export type TransferAdminPayload = {
    new_admin_user_id: string;
};

export type DeleteMemberPayload = {
    user_id: string;
};
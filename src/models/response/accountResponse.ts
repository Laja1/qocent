export type AccountResponse = {
    account_id: string;
    account_org_id: string;
    account_provider: string;
    account_provider_id: string;
    account_name: string;
    account_email: string;
    account_status: string;
    account_created_at: string;
    account_updated_at: string;
};

export type AccountListResponse = {
    data: AccountResponse[];
    message: string;
    status: string;
};

export type AccountStatusResponse = {
    message: string;
    data: AccountResponse;
    status: string;
};

export type AccountMemberResponse = {
    account_id: string;
    account_user_id: string;
    account_member_type: string;
    account_member_created_at: string;
    account_member_updated_at: string;
    user_email?: string;
    user_first_name?: string;
    user_last_name?: string;
};

export type AccountMembersListResponse = {
    message: string;
    status: string;
    data: AccountMemberResponse[];
};
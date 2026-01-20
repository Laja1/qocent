export type CreateAccountPayload = {
    account_name: string;
    child_ou_tags?: Record<string, string>;
};

export type InviteAccountPayload = {
    member_identifier: string;
};

export type CompleteInvitePayload = {
    handshake_id: string;
};

export type GrantAccessPayload = {
    account_id: string;
    access_key_id: string;
    secret_access_key: string;
    session_token?: string;
};
  
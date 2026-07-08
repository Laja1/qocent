export type CloudAccountResponse = {
  status: string;
  message: string;
  account_id: string;
  org_id: string;
  member_type: string;
  login_url?: string | null;
  csp: string;
};

export type AccountActionResponse = {
  message: string;
  status: string;
  data: {
    account_name: string;
    org_name: string;
    login_url?: string | null;
    account_id: string;
    member_type: string;
    org_id: string;
  };
};

/** @deprecated Use CloudAccountResponse */
export type CreateAccountResponse = AccountActionResponse;

export type InitiateInviteResponse = {
  handshake_id: string;
  message?: string;
};

export type GenerateLoginUrlEmailResponse = {
  status: string;
  message: string;
};

export type GrantAccessResponse = {
  status: string;
  message: string;
};

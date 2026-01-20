export type organizationAccountRequest = {
    provider: string;
};

export type UpdateOrganizationPayload = {
    org_name?: string;
    org_status?: string;
};

export type AddAccountToOrgPayload = {
    account_id: string;
};

export type RemoveAccountFromOrgPayload = {
    account_id: string;
};
export type organization = {
  org_id: string;
  org_owner_type: string;
  org_owner_id: string;
  org_provider: "AWS" | "AZURE" | "GCP" | string;
  org_provider_id: string;
  org_name: string;
  org_status: string;
  org_created_at: string;
  org_updated_at: string;
};

export type OrganizationResponse = {
  message: string;
  status: "success" | "error" | string;
  data: organization | organization[];
};

export type OrganizationAccount = {
  account_id: string;
  account_name: string;
  account_email: string;
  account_provider: "AWS" | "AZURE" | "GCP" | string;
  account_status: string;
  member_type?: string | null;
  account_created_at: string;
};

/** @deprecated Use OrganizationAccount or AccountResponse */
export type Account = OrganizationAccount;

export type OrganizationWithAccountsResponse = {
  message: string;
  status: "success" | "error" | string;
  data: {
    organization: organization;
    accounts: OrganizationAccount[];
    total_accounts: number;
  };
};

export type UpdateOrganizationRequest = {
  org_name?: string | null;
  org_status?: string | null;
};

export type OrgWithAccountAPIResponse = {
  message: string;
  status: string;
  data: OrganizationWithAccountsResponse["data"];
};

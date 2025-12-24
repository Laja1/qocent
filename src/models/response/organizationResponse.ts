export type organization = {
    org_id: string;
    org_user_id: string;
    org_provider: 'AWS' | 'AZURE' | 'GCP' | string;
    org_provider_id: string;
    org_name: string;
    org_status: 'Active' | 'Inactive' | 'Suspended' | string;
    org_created_at: string; // ISO datetime
    org_updated_at: string; // ISO datetime
  };
  
  export type OrganizationResponse = {
    message: string;
    status: 'success' | 'error';
    data: organization;
  };
  
  export type Account = {
    account_id: string;
    account_name: string;
    account_email: string;
    account_provider: 'AWS' | 'AZURE' | 'GCP' | string;
    account_status: 'Active' | 'Inactive' | 'Suspended' | string;
    member_type: 'Owner' | 'Member' | string;
    account_created_at: string; // ISO datetime
  };
  
  export type OrganizationWithAccountsResponse = {
    message: string;
    status: 'success' | 'error';
    data: {
      organization: organization;
      accounts: Account[];
    };
  };
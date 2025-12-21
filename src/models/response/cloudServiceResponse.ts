export type CreateAccountResponse = {
    message: string;
    status: string;
    data: {
      account_name: string;
      org_name: string;
      login_url: string;
      account_id: string;
      member_type: string;
      org_id: string;
    };
  };
  
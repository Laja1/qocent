export interface signInResponse {
  status: string;
  message: string;
  data: {
    access_token: string;
    token_type: string;
    user: {
      user_id: string;
      user_email: string;
      user_first_name: string;
      user_last_name: string;
      user_phone_number: string;
      user_country: string;
      user_is_email_verified: boolean;
      user_created_at: string; // ISO date string
    };
  };
}

  
  export type signUpResponse = {
    message: string;
    user: {
      user_id: string;
      user_email: string;
      user_first_name: string;
      user_last_name: string;
      user_phone_number: string;
      user_country: string;
      user_is_email_verified: boolean;
      user_created_at: string; // ISO timestamp
    };
  };
  
  

  export type AccountMember = {
    memberUserCode: string;
    userEmail: string;
    userFirstName: string;
    userLastName: string;
    memberStatus: "ACTIVE" | "INACTIVE"; // assuming possible statuses
    memberCreatedAt: string | null;
    privileges: string[];
  };
  
  export type AccountResponse = {
    accountId: number;
    accountCode: string;
    accountName: string;
    accountType: "INDIVIDUAL" | "BUSINESS"; // extend if there are other types
    accountStatus: "ACTIVE" | "INACTIVE";   // extend as needed
    members: AccountMember[];
    responseCode: string;
    responseMessage: string;
  };
  
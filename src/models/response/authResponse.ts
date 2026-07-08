export type UpdatePasswordResponse = {
  status: string;
  message: string;
};

export interface SignInUser {
  user_id: string;
  user_email: string;
  user_first_name: string;
  user_last_name: string;
  user_phone_number: string | null;
  user_country: string;
  user_is_email_verified: boolean;
  user_created_at: string;
}

export interface SignInBusiness {
  business_id: string;
  business_name: string;
  business_display_name: string;
  business_email: string;
  business_is_email_verified: boolean;
}

export interface LoginToken {
  token_type: string;
  access_token_expires_in?: number | null;
  is_business: boolean;
  user: SignInUser | null;
  business: SignInBusiness | null;
  /** Populated client-side from X-Access-Token response header */
  access_token?: string;
}

export interface signInResponse {
  status: string;
  message: string;
  data: LoginToken;
}

export type signUpResponse = {
  message: string;
  user: SignInUser;
};

export type BusinessSignupResponse = {
  business_id: string;
  business_name: string;
  business_display_name: string;
  business_email: string;
  business_is_email_verified: boolean;
};

export type LogoutResponse = {
  status: string;
  message: string;
};

export type VerifyOTPResponse = {
  status: string;
  message: string;
  entity_id?: string | null;
};

export type AccountMember = {
  memberUserCode: string;
  userEmail: string;
  userFirstName: string;
  userLastName: string;
  memberStatus: "ACTIVE" | "INACTIVE";
  memberCreatedAt: string | null;
  privileges: string[];
};

export type AccountResponse = {
  accountId: number;
  accountCode: string;
  accountName: string;
  accountType: "INDIVIDUAL" | "BUSINESS";
  accountStatus: "ACTIVE" | "INACTIVE";
  members: AccountMember[];
  responseCode: string;
  responseMessage: string;
};

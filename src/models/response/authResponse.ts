export type UpdatePasswordResponse = {
  status: string;
  message: string;
};

export interface SignInUser {
  user_id: string;
  user_email: string;
  user_first_name: string;
  user_last_name: string;
  user_phone_number: string;
  user_country: string;
  user_is_email_verified: boolean;
  user_created_at: string;
}

export interface SignInBusiness {
  business_id: string;
  business_name: string;
  business_display_name: string;
  business_slug: string;
  business_email: string;
  business_is_email_verified: boolean;
  status: string;
}

export interface signInResponse {
  status: string;
  message: string;
  data: {
    access_token: string;
    token_type: string;
    is_business: boolean;
    user: SignInUser | null;
    business: SignInBusiness | null;
  };
}

export function businessNeedsCompletion(
  business: SignInBusiness | null | undefined
): boolean {
  if (!business) return false;
  return (
    business.business_display_name === "Pending Completion" ||
    business.business_slug.startsWith("pending-")
  );
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
    user_created_at: string;
  };
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

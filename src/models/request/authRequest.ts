export type SignupAccountType = "INDIVIDUAL" | "BUSINESS";

export type signupRequest = {
  user_first_name: string;
  user_last_name: string;
  user_email: string;
  user_phone_number: string;
  user_country: string;
  user_password: string;
  agree_to_terms: boolean;
};

export type businessSignupRequest = {
  business_name: string;
  business_display_name?: string | null;
  business_email: string;
  business_phone: string;
  business_country: string;
  business_password: string;
  agree_to_terms: boolean;
};

/** @deprecated Use businessSignupRequest — business registration is now one step */
export type businessInitRequest = businessSignupRequest;

/** @deprecated Business completion step removed from API */
export type businessCompleteRequest = {
  business_email: string;
  business_display_name: string;
};

export type SignupFormValues = {
  accountType: SignupAccountType | "";
  user_first_name: string;
  user_last_name: string;
  user_email: string;
  user_phone_number: string;
  user_phone_number_full: string;
  phone_code: string;
  user_country: string;
  user_password: string;
  business_name: string;
  business_email: string;
  business_phone: string;
  business_phone_full: string;
  business_country: string;
  business_password: string;
};

export const signupFormInit: SignupFormValues = {
  accountType: "",
  user_first_name: "",
  user_last_name: "",
  user_email: "",
  user_phone_number: "",
  user_phone_number_full: "",
  phone_code: "+1",
  user_country: "",
  user_password: "",
  business_name: "",
  business_email: "",
  business_phone: "",
  business_phone_full: "",
  business_country: "",
  business_password: "",
};

export function buildIndividualSignupPayload(
  values: SignupFormValues,
  agreeToTerms: boolean
): signupRequest {
  return {
    user_first_name: values.user_first_name,
    user_last_name: values.user_last_name,
    user_email: values.user_email,
    user_country: values.user_country,
    user_password: values.user_password,
    user_phone_number:
      values.user_phone_number_full || values.user_phone_number,
    agree_to_terms: agreeToTerms,
  };
}

export function buildBusinessSignupPayload(
  values: SignupFormValues,
  agreeToTerms: boolean
): businessSignupRequest {
  return {
    business_name: values.business_name,
    business_email: values.business_email,
    business_country: values.business_country,
    business_phone: values.business_phone_full || values.business_phone,
    business_password: values.business_password,
    agree_to_terms: agreeToTerms,
  };
}

/** @deprecated Use buildBusinessSignupPayload */
export function buildBusinessInitPayload(
  values: SignupFormValues
): businessSignupRequest {
  return buildBusinessSignupPayload(values, true);
}

export type signInRequest = {
  email: string;
  password: string;
};

export const signInInit = {
  email: "",
  password: "",
};

export const forgotPasswordInit = {
  email: "",
};

export type completeEnrollmentRequest = {
  code: string;
  email: string;
};

export const completeEnrollmentInit = {
  otp: "",
  email: "",
};

export type resendOtpRequest = {
  email: string;
};

export type forgotPasswordpRequest = {
  email: string;
};

export type completePasswordResetRequest = {
  email: string;
  new_password: string;
  confirm_password?: string;
  token: string;
};

export type UpdatePasswordRequest = {
  current_password: string;
  new_password: string;
  confirm_password: string;
};

export const completePasswordResetInit = {
  token: "",
  email: "",
  new_password: "",
};

export type updateProfessionalServiceRequest = {
  serviceBookingDate: string;
  serviceType: string;
};

export type OtpFlowState = {
  email: string;
  accountType: SignupAccountType;
};

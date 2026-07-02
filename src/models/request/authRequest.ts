export type SignupAccountType = "INDIVIDUAL" | "BUSINESS";

export type signupRequest = {
  user_first_name: string;
  user_last_name: string;
  user_email: string;
  user_phone_number: string;
  user_country: string;
  user_password: string;
};

export type businessInitRequest = {
  business_name: string;
  business_email: string;
  business_phone: string;
  business_country: string;
  business_password: string;
};

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
  values: SignupFormValues
): signupRequest {
  return {
    user_first_name: values.user_first_name,
    user_last_name: values.user_last_name,
    user_email: values.user_email,
    user_country: values.user_country,
    user_password: values.user_password,
    user_phone_number:
      values.user_phone_number_full || values.user_phone_number,
  };
}

export function buildBusinessInitPayload(
  values: SignupFormValues
): businessInitRequest {
  return {
    business_name: values.business_name,
    business_email: values.business_email,
    business_country: values.business_country,
    business_phone: values.business_phone_full || values.business_phone,
    business_password: values.business_password,
  };
}

export type signInRequest = {
  user_email: string;
  user_password: string;
};

export const signInInit = {
  user_email: "",
  user_password: "",
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
  user_id: string;
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

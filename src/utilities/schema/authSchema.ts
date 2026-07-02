/* eslint-disable @typescript-eslint/no-unused-vars */
import { string, object } from 'yup';
import {
  codeValidatiion,
  defaultValidation,
  emailValidation,
  passwordValidation,
  personNameValidation,
} from '.';

export const loginFormValidationSchema = object().shape({
  user_email: emailValidation(),
  user_password: passwordValidation(),
});

export const registerFormValidationSchema = object().shape({
  user_first_name: personNameValidation('First name'),
  user_last_name: personNameValidation('Last name'),
  user_email: emailValidation(),
  user_password: passwordValidation(),
  user_phone_number: defaultValidation('Phone number'),
  user_country: defaultValidation('User country'),
});

export const signupValidationSchema = object().shape({
  accountType: string()
    .oneOf(['INDIVIDUAL', 'BUSINESS'], 'Select an account type')
    .required('Select an account type'),
  user_first_name: string().when('accountType', {
    is: 'INDIVIDUAL',
    then: () => personNameValidation('First name'),
    otherwise: (schema) => schema.notRequired(),
  }),
  user_last_name: string().when('accountType', {
    is: 'INDIVIDUAL',
    then: () => personNameValidation('Last name'),
    otherwise: (schema) => schema.notRequired(),
  }),
  user_email: string().when('accountType', {
    is: 'INDIVIDUAL',
    then: () => emailValidation(),
    otherwise: (schema) => schema.notRequired(),
  }),
  user_password: string().when('accountType', {
    is: 'INDIVIDUAL',
    then: () => passwordValidation(),
    otherwise: (schema) => schema.notRequired(),
  }),
  user_country: string().when('accountType', {
    is: 'INDIVIDUAL',
    then: () => defaultValidation('Country'),
    otherwise: (schema) => schema.notRequired(),
  }),
  user_phone_number: string().when('accountType', {
    is: 'INDIVIDUAL',
    then: () => defaultValidation('Phone number'),
    otherwise: (schema) => schema.notRequired(),
  }),
  business_name: string().when('accountType', {
    is: 'BUSINESS',
    then: () => defaultValidation('Business name'),
    otherwise: (schema) => schema.notRequired(),
  }),
  business_email: string().when('accountType', {
    is: 'BUSINESS',
    then: () => emailValidation(),
    otherwise: (schema) => schema.notRequired(),
  }),
  business_country: string().when('accountType', {
    is: 'BUSINESS',
    then: () => defaultValidation('Country'),
    otherwise: (schema) => schema.notRequired(),
  }),
  business_phone: string().when('accountType', {
    is: 'BUSINESS',
    then: () => defaultValidation('Business phone number'),
    otherwise: (schema) => schema.notRequired(),
  }),
  business_password: string().when('accountType', {
    is: 'BUSINESS',
    then: () => passwordValidation(),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export const businessCompleteValidationSchema = object().shape({
  business_email: emailValidation(),
  business_display_name: defaultValidation('Business display name'),
});

export const USER_OTP_LENGTH = 6;
export const BUSINESS_OTP_LENGTH = 5;

export const getConfirmAccountSchema = (accountType: 'INDIVIDUAL' | 'BUSINESS') =>
  object().shape({
    otp: codeValidatiion(
      'OTP',
      accountType === 'BUSINESS' ? BUSINESS_OTP_LENGTH : USER_OTP_LENGTH
    ),
  });

export const completePasswordSchema = object().shape({
  otp: codeValidatiion('OTP'),
  userPassword: passwordValidation(),
});

export const resetPasswordSchema = object().shape({
  token: defaultValidation('Token sent to your email'),
  new_password: passwordValidation(),
});

export const forgotPasswordFormValidationSchema = object().shape({
  email: emailValidation(),
});

export const resetPasswordFormValidationSchema = object().shape({
  password: passwordValidation(),
  confirmPassword: string()
    .test(
      'password-match',
      'Password and Confirm Password must match',
      function (value?: string) {
        return this.parent.password === value;
      }
    )
    .required('Confirm Password is required'),
});

export const setPasswordFormValidationSchema = object().shape({
  defaultPassword: passwordValidation(),
  password: passwordValidation(),
  confirmPassword: string()
    .test(
      'password-match',
      'Password and Confirm Password must match',
      function (value?: string) {
        return this.parent.password === value;
      }
    )
    .required('Confirm Password is required'),
});

export const changePasswordFormValidationSchema = object().shape({
  currentPassword: passwordValidation(),
  password: passwordValidation(),
  confirmPassword: string()
    .test(
      'password-match',
      'Password and Confirm Password must match',
      function (value?: string) {
        return this.parent.password === value;
      }
    )
    .required('Confirm Password is required'),
});

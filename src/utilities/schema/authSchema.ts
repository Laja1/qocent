/* eslint-disable @typescript-eslint/no-unused-vars */
import { string, object, array } from 'yup';
import { codeValidatiion, defaultValidation, emailValidation, passwordValidation } from '.';

export const loginFormValidationSchema = object().shape({
  userEmail: emailValidation(),
  userPassword: passwordValidation(),
});

export const registerFormValidationSchema = object().shape({
  // Personal information
  userFirstName: defaultValidation('First Name'),
  userLastName: defaultValidation('Last Name'),
  userEmail: emailValidation(),
  userPassword: passwordValidation(),
  accountType: string()
    .oneOf(['individual', 'organization'], 'Invalid account type')
    .required('Account type is required'),
  accountName: string().notRequired(),
  userRoleId: string().notRequired(),
  
  // Business - only required fields for organization
  business: object().when('accountType', {
    is: 'organization',
    then: (schema) => schema.shape({
      businessName: defaultValidation('Business name'),
      businessDescription: defaultValidation('Business description'),
      businessSize: defaultValidation('Company size'),
      businessWebsite: string().url('Please enter a valid URL').notRequired(),
      businessContactName: string().notRequired(),
      businessContactEmail: emailValidation(),
      businessContactNumber: string().notRequired(),
      businessContactRole: string().notRequired(),
    }),
    otherwise: (schema) => schema.notRequired(),
  }),
  
  // Services - optional
  services: array().notRequired(),
});



export const confirmAccountSchema = object().shape({
  otp:codeValidatiion('OTP')
});

export const completePasswordSchema = object().shape({
  otp:codeValidatiion('OTP'),
  userPassword: passwordValidation(),
});

export const resetPasswordSchema = object().shape({
  otp:codeValidatiion('OTP'),
  userPassword: passwordValidation(),
});

export const forgotPasswordFormValidationSchema = object().shape({
  userEmail: emailValidation(),
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



import { string, object } from 'yup';
import { codeValidatiion, defaultValidation, emailValidation, passwordValidation } from '.';

export const loginFormValidationSchema = object().shape({
  userEmail: emailValidation(),
  userPassword: passwordValidation(),
});

export const registerFormValidationSchema = object().shape({
  userFirstName: defaultValidation('First Name'),
  userLastName: defaultValidation('Last Name'),
  userEmail: emailValidation(),
  userPassword: passwordValidation(),
  accountType: string()
  .oneOf(['Individual', 'Organization'], 'Invalid account type')
  .required('Account type is required'),
  accountName: string().when('accountType', ([accountType], schema) => 
    accountType === 'Organization'
      ? defaultValidation('Account name')
      : schema.notRequired()
  ),
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

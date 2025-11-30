/* eslint-disable @typescript-eslint/no-unused-vars */
import { string, object } from 'yup';
import { codeValidatiion, defaultValidation, emailValidation, passwordValidation } from '.';

export const loginFormValidationSchema = object().shape({
  user_email: emailValidation(),
  user_password: passwordValidation(),
});

export const registerFormValidationSchema = object().shape({
  // Personal information
  user_first_name: defaultValidation('First Name'),
  user_last_name: defaultValidation('Last Name'),
  user_email: emailValidation(),
  user_password: passwordValidation(),
  user_phone_number:defaultValidation('Phone number'),
  user_country:defaultValidation('User country'),  
 
});



export const confirmAccountSchema = object().shape({
  otp:codeValidatiion('OTP')
});

export const completePasswordSchema = object().shape({
  otp:codeValidatiion('OTP'),
  userPassword: passwordValidation(),
});

export const resetPasswordSchema = object().shape({
  token:defaultValidation('Token sent to your email'),
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



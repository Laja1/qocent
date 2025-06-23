import { string, object } from 'yup';
import { defaultValidation, emailValidation, passwordValidation } from '.';

export const loginFormValidationSchema = object().shape({
  emailAddress: emailValidation(),
  password: string().required('Password is required'),
});

export const registerFormValidationSchema = object().shape({
  firstName: defaultValidation('First Name'),
  lastName: defaultValidation('Last Name'),
  emailAddress: emailValidation(),
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

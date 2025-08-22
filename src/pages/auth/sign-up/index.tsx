/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthLayout from "@/components/layouts/authLayout";
import { Button, SelectField } from "@/components/shared";
import { Textfield } from "@/components/shared/textfield";
import { showCustomToast } from "@/components/shared/toast";
import { signUpInit, type signupRequest } from "@/models/request/authRequest";
import { RouteConstant } from "@/router/routes";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import { useSignInMutation, useSignUpMutation } from "@/service/kotlin/authApi";
import { registerFormValidationSchema } from "@/utilities/schema/authSchema";
import { useFormik } from "formik";
import { EyeClosed, EyeIcon, Mail, User, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { authStore } from "@/store/authSlice";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const [seePassword, setSeePassword] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signupMutation, { isLoading }] = useSignUpMutation();
  const [signIn] = useSignInMutation();

  const handleSubmit = async (values: signupRequest) => {
    console.log(googleLoading);
    try {
      const res = await signupMutation(values).unwrap();
      showCustomToast(res?.responseMessage, {
        toastOptions: {
          type: "success",
          autoClose: 5000,
        },
      });

      navigate(RouteConstant.auth.otp.path, { state: values.userEmail });
    } catch (error) {
      const message = ErrorHandler.extractMessage(error);
      showCustomToast(message, {
        toastOptions: {
          type: "error",
          autoClose: 5000,
        },
      });
    }
  };

  const formik = useFormik({
    initialValues: signUpInit,
    onSubmit: handleSubmit,
    validationSchema: registerFormValidationSchema,
  });

  useEffect(() => {
    formik.validateForm();
  }, []);

  const handleGoogleSignIn = async (credentialResponse: CredentialResponse) => {
    try {
      setGoogleLoading(true);

      if (credentialResponse.credential) {
             try {
          // Send the Google ID token to your backend for signup
          const res = await signIn({
            idToken: credentialResponse.credential, // 👈 now using ID token
          }).unwrap();
          dispatch(
            authStore.action.setCredentials({
              token: res.accessToken,
              userEmail: res?.userEmail,
              userFirstName: res?.userFirstName,
              userLastName: res?.userLastName,
              privileges: res?.privileges,
              userId: res?.userId,
            })
          );
          navigate(RouteConstant.dashboard.console.path);
        } catch (error: any) {
          const message = ErrorHandler.extractMessage(error);
          showCustomToast(message, {
            toastOptions: {
              type: "error",
              autoClose: 5000,
            },
          });
        }
      } else {
        showCustomToast("something went wrong.", {
          toastOptions: {
            type: "error",
            autoClose: 3000,
          },
        });
      }

      setGoogleLoading(false);
    } catch (error: any) {
      setGoogleLoading(false);
      console.error("Google sign-in error:", error);
      const message =
        ErrorHandler.extractMessage(error) || "Google sign-in failed";
      showCustomToast(message, {
        toastOptions: {
          type: "error",
          autoClose: 5000,
        },
      });
    }
  };

  const handleGoogleError = () => {
    setGoogleLoading(false);
    console.error("Google OAuth Error");
    showCustomToast("Google sign-in failed. Please try again.", {
      toastOptions: {
        type: "error",
        autoClose: 3000,
      },
    });
  };

  return (
    <AuthLayout title="Sign Up" subtitle="Sign up to your account">
      <div className="gap-3 flex flex-col">
        <div className="flex flex-col gap-4">
          <Textfield
            name="userFirstName"
            label="First Name"
            prefixIcon={<User size={16} className="text-black" />}
            placeholder="Enter your first name"
            formik={formik}
            error={
              formik?.touched.userFirstName && formik?.errors.userFirstName
                ? formik?.errors.userFirstName
                : ""
            }
          />
          <Textfield
            name="userLastName"
            label="Last Name"
            prefixIcon={<User size={16} className="text-black" />}
            placeholder="Enter your last name"
            formik={formik}
            error={
              formik?.touched.userLastName && formik?.errors.userLastName
                ? formik?.errors.userLastName
                : ""
            }
          />
        </div>
        <Textfield
          name="userEmail"
          label="Email"
          placeholder="Enter your email address"
          formik={formik}
          prefixIcon={<Mail size={16} className="text-black" />}
          error={
            formik?.touched.userEmail && formik?.errors.userEmail
              ? formik?.errors.userEmail
              : ""
          }
        />
        <SelectField
          name="accountType"
          placeholder="Select an account type"
          label="Account Type"
          formik={formik}
          options={[
            { label: "Individual", value: "Individual" },
            { label: "Organization", value: "Organization" },
          ]}
        />
        {formik.values.accountType === "Organization" && (
          <Textfield
            name="accountName"
            label="Account Name"
            placeholder="Enter your account name"
            formik={formik}
            error={
              formik?.touched.accountName && formik?.errors.accountName
                ? formik?.errors.accountName
                : ""
            }
          />
        )}
        <Textfield
          name="userPassword"
          label="Password"
          placeholder="Enter your password"
          prefixIcon={<Lock size={16} className="text-black" />}
          type={seePassword ? "text" : "password"}
          suffixIcon={
            <button onClick={() => setSeePassword((prev) => !prev)}>
              {seePassword ? (
                <EyeIcon size={16} className="text-black" />
              ) : (
                <EyeClosed size={16} className="text-black" />
              )}
            </button>
          }
          formik={formik}
          error={
            formik?.touched.userPassword && formik?.errors.userPassword
              ? formik?.errors.userPassword
              : ""
          }
        />
        <Button
          label="Sign Up"
          className="w-full mt-3"
          disabled={!formik.isValid || isLoading}
          onClick={formik.handleSubmit}
          isLoading={isLoading}
        />

        <div className="flex items-center my-4">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <div className="w-full flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSignIn}
              onError={handleGoogleError}
              useOneTap={false}
              theme="outline"
              size="large"
              text="continue_with"
              shape="rectangular"
              logo_alignment="left"
              width="100%"
            />
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUp;

/* eslint-disable @typescript-eslint/no-explicit-any */ // Updated SignIn component using ID token flow
import AuthLayout from "@/components/layouts/authLayout";
import { Button, Textfield } from "@/components/shared";
import { showCustomToast } from "@/components/shared/toast";
import { signInInit } from "@/models/request/authRequest";
import { RouteConstant } from "@/router/routes";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import { useSignInMutation } from "@/service/kotlin/authApi";
import { authStore } from "@/store/authSlice";
import { loginFormValidationSchema } from "@/utilities/schema/authSchema";
import { useFormik } from "formik";
import { EyeClosed, EyeIcon, Mail, Lock } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";

const SignIn = () => {
  const [seePassword, setSeePassword] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signIn, { isLoading }] = useSignInMutation();

  const handleRegularSignIn = async (values: any) => {
    try {
      const res = await signIn(values).unwrap();

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
  };
  console.log(googleLoading);

  const handleGoogleSignIn = async (credentialResponse: CredentialResponse) => {
    try {
      setGoogleLoading(true);

      if (credentialResponse.credential) {
        console.log("Google ID token:", credentialResponse.credential);

        try {
          const res = await signIn({
            idToken: credentialResponse.credential, // This is now the actual ID token
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
        showCustomToast("No credential received from Google", {
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

  const formik = useFormik({
    initialValues: signInInit,
    onSubmit: handleRegularSignIn,
    validationSchema: loginFormValidationSchema,
  });

  return (
    <AuthLayout
      title="Sign In"
      subtitle="Enter your credentials to access your cloud resources"
    >
      <div className="flex flex-col gap-3">
        <Textfield
          formik={formik}
          name="userEmail"
          label="Email"
          prefixIcon={<Mail size={16} className="text-black" />}
          placeholder="Enter your email"
          error={
            formik?.touched.userEmail && formik?.errors.userEmail
              ? formik?.errors.userEmail
              : ""
          }
        />
        <Textfield
          label="Password"
          name="userPassword"
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
        <p
          onClick={() => navigate(RouteConstant.auth.forgotPassword.path)}
          className="text-xs text-right hover:cursor-pointer text-red-700"
        >
          Forgot Password
        </p>

        <Button
          label="Sign In"
          className="w-full mt-3"
          onClick={() => formik?.handleSubmit()}
          disabled={!formik?.isValid || isLoading}
          isLoading={isLoading}
        />

        <div className="flex items-center my-4">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <div className="w-full flex justify-center">
          {/* Replace the custom button with GoogleLogin component */}

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

export default SignIn;

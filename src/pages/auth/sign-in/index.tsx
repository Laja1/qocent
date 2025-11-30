/* eslint-disable @typescript-eslint/no-explicit-any */ // Updated SignIn component using ID token flow
import AuthLayout from "@/components/layouts/authLayout";
import { Button, Textfield } from "@/components/shared";
import { showCustomToast } from "@/components/shared/toast";
import { signInInit } from "@/models/request/authRequest";
import { RouteConstant } from "@/router/routes";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import { useSignInMutation } from "@/service/python/authApi";
import { authStore } from "@/store/authSlice";
import { loginFormValidationSchema } from "@/utilities/schema/authSchema";
import { useFormik } from "formik";
import { EyeClosed, EyeIcon, Mail, Lock } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [seePassword, setSeePassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signIn, { isLoading }] = useSignInMutation();

  const handleRegularSignIn = async (values: any) => {
    try {
      const res = await signIn(values).unwrap();
      console.log(res);
      dispatch(
        authStore.action.setCredentials({
          token: res?.access_token,
          userEmail: res?.user.user_email,
          userFirstName: res?.user?.user_first_name,
          userLastName: res?.user?.user_last_name,
          userId: Number(res?.user?.user_id),
        })
      );
      console.log(res);
      // Fix: setServices expects a string[], but res.service is Service[]

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
          name="user_email"
          label="Email"
          prefixIcon={<Mail size={16} className="text-black" />}
          placeholder="Enter your email"
          error={
            formik?.touched.user_email && formik?.errors.user_email
              ? formik?.errors.user_email
              : ""
          }
        />
        <Textfield
          label="Password"
          name="user_password"
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
            formik?.touched.user_password && formik?.errors.user_password
              ? formik?.errors.user_password
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
      </div>
    </AuthLayout>
  );
};

export default SignIn;

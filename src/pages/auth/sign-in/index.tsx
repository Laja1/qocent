/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthLayout from "@/components/layouts/authLayout";
import { Button, Textfield } from "@/components/shared";
import { showCustomToast } from "@/components/shared/toast";
import { signInInit } from "@/models/request/authRequest";
import type { signInResponse } from "@/models/response/authResponse";
import { RouteConstant } from "@/router/routes";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import { useSignInMutation } from "@/service/authApi";
import { authStore } from "@/store/authSlice";
import { loginFormValidationSchema } from "@/utilities/schema/authSchema";
import { useFormik } from "formik";
import { EyeClosed, EyeIcon, Mail, Lock } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function mapSignInToCredentials(res: signInResponse) {
  const { data } = res;

  if (data.is_business && data.business) {
    const { business } = data;
    return {
      token: data.access_token,
      isBusiness: true,
      userEmail: business.business_email,
      userFirstName: business.business_display_name || business.business_name,
      userLastName: null,
      userId: business.business_id,
      businessId: business.business_id,
    };
  }

  if (data.user) {
    return {
      token: data.access_token,
      isBusiness: false,
      userEmail: data.user.user_email,
      userFirstName: data.user.user_first_name,
      userLastName: data.user.user_last_name,
      userId: data.user.user_id,
      businessId: null,
    };
  }

  throw new Error("Invalid login response");
}

const SignIn = () => {
  const [seePassword, setSeePassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signIn, { isLoading }] = useSignInMutation();

  const handleRegularSignIn = async (values: any) => {
    try {
      const res = await signIn(values).unwrap();
      dispatch(authStore.action.setCredentials(mapSignInToCredentials(res)));

      showCustomToast(res.message, {
        toastOptions: { type: "success", autoClose: 4000 },
      });

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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
        className="flex flex-col gap-3"
      >
        <Textfield
          formik={formik}
          name="email"
          label="Email"
          prefixIcon={<Mail size={16} className="text-black" />}
          placeholder="Enter your email"
          error={
            formik?.touched.email && formik?.errors.email
              ? formik?.errors.email
              : ""
          }
        />
        <Textfield
          label="Password"
          name="password"
          placeholder="Enter your password"
          prefixIcon={<Lock size={16} className="text-black" />}
          type={seePassword ? "text" : "password"}
          suffixIcon={
            <button
              type="button"
              aria-label={seePassword ? "Hide password" : "Show password"}
              onClick={() => setSeePassword((prev) => !prev)}
            >
              {seePassword ? (
                <EyeIcon size={16} className="text-black" />
              ) : (
                <EyeClosed size={16} className="text-black" />
              )}
            </button>
          }
          formik={formik}
          error={
            formik?.touched.password && formik?.errors.password
              ? formik?.errors.password
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
          type="submit"
          disabled={!formik?.isValid || isLoading}
          isLoading={isLoading}
        />
      </form>
    </AuthLayout>
  );
};

export default SignIn;

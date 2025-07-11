import AuthLayout from "@/components/layouts/authLayout";
import { Button, Textfield } from "@/components/shared";
import { showCustomToast } from "@/components/shared/toast";
import { signInInit, type signInRequest } from "@/models/request/authRequest";
import { RouteConstant } from "@/router/routes";
import { useSignInMutation } from "@/service/authApi";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import { authStore } from "@/store/authSlice";
import { loginFormValidationSchema } from "@/utilities/schema/authSchema";
import { useFormik } from "formik";
import { EyeClosed, EyeIcon, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [seePassword, setSeePassword] = useState(false);
  const dispatch = useDispatch();
  const [signIn, { isLoading }] = useSignInMutation();
  const handleSubmit = async (values: signInRequest) => {
    try {
      const res = await signIn(values).unwrap();
      console.log(res);
      navigate(RouteConstant.dashboard.serverSite.path);
      dispatch(
        authStore.action.setCredentials({
          token: res.token?.replace("Bearer ", ""),
          userEmail: res.userEmail,
          userFirstName: res.data?.userFirstName,
          userLastName: res.data?.userLastName,
          userId: res.data?.userId,
          userRoleId: res.data?.userRoleId,
          privileges: res.privileges ?? [],
        })
      );

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);

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
    onSubmit: handleSubmit,
    validationSchema: loginFormValidationSchema,
  });
  const navigate = useNavigate();

  useEffect(() => {
    formik.validateForm();
  }, []);
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
          suffixIcon={<Mail size={16} />}
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
          type={seePassword ? "text" : "password"}
          suffixIcon={
            <button onClick={() => setSeePassword((prev) => !prev)}>
              {seePassword ? <EyeIcon size={16} /> : <EyeClosed size={16} />}
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
      </div>
    </AuthLayout>
  );
};

export default SignIn;

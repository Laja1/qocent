import AuthLayout from "@/components/layouts/authLayout";
import { Button, Textfield } from "@/components/shared";
import { showCustomToast } from "@/components/shared/toast";
import {
  forgotPasswordInit,
  type forgotPasswordpRequest,
} from "@/models/request/authRequest";
import { RouteConstant } from "@/router/routes";
import { useForgotPasswordMutation } from "@/service/kotlin/authApi";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import { forgotPasswordFormValidationSchema } from "@/utilities/schema/authSchema";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const onSubmit = async (values: forgotPasswordpRequest) => {
    try {
      const res = await forgotPassword(values).unwrap();
      console.log(res);

      // Now res.responseMessage will be available
      showCustomToast(res?.responseMessage, {
        toastOptions: {
          type: "success",
          autoClose: 5000,
        },
      });

      navigate(RouteConstant.auth.confirmPasswordReset.path, {
        state: values?.userEmail,
      });
    } catch (error) {
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
    initialValues: forgotPasswordInit,
    onSubmit,
    validationSchema: forgotPasswordFormValidationSchema,
  });
  const navigate = useNavigate();

  useEffect(() => {
    formik.validateForm();
  }, []);
  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter your user account's verified email address and we will send you a password reset link."
    >
      <div className="flex flex-col gap-3">
        <Textfield
          formik={formik}
          name="userEmail"
          label="Email"
          placeholder="Enter your email"
          error={
            formik?.touched.userEmail && formik?.errors.userEmail
              ? formik?.errors.userEmail
              : ""
          }
        />

        <Button
          label="Send password reset email"
          className="w-full mt-3"
          disabled={!formik?.isValid || isLoading}
          isLoading={isLoading}
          onClick={formik.handleSubmit}
        />
        <p
          onClick={() => navigate(RouteConstant.auth.signin.path)}
          className="text-xs text-right hover:cursor-pointer text-red-700"
        >
          Back to login
        </p>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;

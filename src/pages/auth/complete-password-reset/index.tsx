import AuthLayout from "@/components/layouts/authLayout";
import { getMaskedEmail } from "@/components/not-shared/masked-email";
import { Button, Textfield } from "@/components/shared";
import { showCustomToast } from "@/components/shared/toast";
import {
  completePasswordResetInit,
  type completePasswordResetRequest,
} from "@/models/request/authRequest";
import { RouteConstant } from "@/router/routes";
import {
  useCompletePasswordResetMutation,
  useForgotPasswordMutation,
} from "@/service/python/authApi";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import { resetPasswordSchema } from "@/utilities/schema/authSchema";
import { useFormik } from "formik";
import { EyeClosed, EyeIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CompletePasswordReset = () => {
  const [seePassword, setSeePassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  const [completePasswordReset, { isLoading }] =
    useCompletePasswordResetMutation();
  const [resendOtp] = useForgotPasswordMutation();
  const onSubmit = async (values: completePasswordResetRequest) => {
    const payload = {
      email: state,
      confirm_password: values?.new_password,
      new_password: values?.new_password,
      token: String(values?.token),
    };
    try {
      const res = await completePasswordReset(payload).unwrap();
      showCustomToast(res?.message, {
        toastOptions: {
          type: "success",
          autoClose: 5000,
        },
      });
      navigate(RouteConstant.auth.signin.path);
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

  const ResendOtp = async () => {
    const payload = {
      email: state,
    };
    try {
      const res = await resendOtp(payload).unwrap();
      console.log(res);
      showCustomToast(res?.message, {
        toastOptions: {
          type: "success",
          autoClose: 5000,
        },
      });
    } catch (error) {
      console.log(error);
      showCustomToast("Failed to resend OTP", {
        toastOptions: {
          type: "error",
          autoClose: 5000,
        },
      });
    }
  };

  const formik = useFormik({
    initialValues: completePasswordResetInit,
    onSubmit,
    validationSchema: resetPasswordSchema,
  });

  useEffect(() => {
    formik.validateForm();
  }, []);
  return (
    <AuthLayout
      title="Reset Your Password"
      subtitle={`We’ve sent a one-time password (OTP) to ${getMaskedEmail(
        state
      )}. Enter it below along with your new password to reset your account.`}
    >
      <div className="flex flex-col gap-3">
        <Textfield
          formik={formik}
          name="token"
          label="Token"
          placeholder="Enter your token"
          error={
            formik?.touched.token && formik?.errors.token
              ? formik?.errors.token
              : ""
          }
        />
        <Textfield
          label="New Password"
          name="new_password"
          placeholder="Enter your password"
          type={seePassword ? "text" : "password"}
          suffixIcon={
            <button onClick={() => setSeePassword((prev) => !prev)}>
              {seePassword ? <EyeIcon size={16} /> : <EyeClosed size={16} />}
            </button>
          }
          formik={formik}
          error={
            formik?.touched.new_password && formik?.errors.new_password
              ? formik?.errors.new_password
              : ""
          }
        />
        <Button
          label="Reset Password"
          className="w-full mt-3"
          disabled={!formik?.isValid || isLoading}
          isLoading={isLoading}
          onClick={formik.handleSubmit}
        />
        <p className="text-center mt-2 text-xs text-gray-700">
          Didn't get a code?{" "}
          <span
            onClick={() => ResendOtp()}
            className="text-red-700 hover:cursor-pointer"
          >
            Resend OTP
          </span>
        </p>
      </div>
    </AuthLayout>
  );
};

export default CompletePasswordReset;

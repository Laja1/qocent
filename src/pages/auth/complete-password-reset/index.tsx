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
  useResendOtpMutation,
} from "@/service/kotlin/authApi";
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
  const [resendOtp] = useResendOtpMutation();
  const onSubmit = async (values: completePasswordResetRequest) => {
    const payload = {
      userEmail: state,
      userPassword: values?.userPassword,
      otp: String(values?.otp),
    };
    try {
      const res = await completePasswordReset(payload).unwrap();
      showCustomToast(res?.responseMessage, {
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
      userEmail: state,
    };
    try {
      const res = await resendOtp(payload).unwrap();
      console.log(res);
      showCustomToast(res?.responseMessage, {
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
          name="otp"
          maxLength={6}
          label="OTP"
          type="number"
          placeholder="Enter your OTP"
          error={
            formik?.touched.otp && formik?.errors.otp ? formik?.errors.otp : ""
          }
        />
        <Textfield
          label="New Password"
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

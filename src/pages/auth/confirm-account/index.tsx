/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthLayout from "@/components/layouts/authLayout";
import { getMaskedEmail } from "@/components/not-shared/masked-email";
import { Button, Textfield } from "@/components/shared";
import { showCustomToast } from "@/components/shared/toast";
import {
  completeEnrollmentInit,
  type OtpFlowState,
} from "@/models/request/authRequest";
import { RouteConstant } from "@/router/routes";
import {
  useCompleteEnrollmentMutation,
  useSendOtpMutation,
} from "@/service/authApi";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import { useResendOtpCooldown } from "@/hooks/useResendOtpCooldown";
import {
  BUSINESS_OTP_LENGTH,
  getConfirmAccountSchema,
  USER_OTP_LENGTH,
} from "@/utilities/schema/authSchema";
import { useFormik } from "formik";
import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ConfirmAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const flowState = location.state as OtpFlowState | string | undefined;
  const email = typeof flowState === "string" ? flowState : flowState?.email;
  const accountType =
    typeof flowState === "object" && flowState?.accountType
      ? flowState.accountType
      : "INDIVIDUAL";
  const otpLength =
    accountType === "BUSINESS" ? BUSINESS_OTP_LENGTH : USER_OTP_LENGTH;
  const validationSchema = useMemo(
    () => getConfirmAccountSchema(accountType),
    [accountType]
  );

  const [completeEnrollment, { isLoading }] = useCompleteEnrollmentMutation();
  const [resendOtp, { isLoading: isResending }] = useSendOtpMutation();
  const { canResend, formattedCooldown, resetCooldown } = useResendOtpCooldown();

  const onSubmit = async (values: { otp: string }) => {
    if (!email) {
      showCustomToast("Missing email for verification. Please sign up again.", {
        toastOptions: { type: "error", autoClose: 5000 },
      });
      navigate(RouteConstant.auth.signup.path);
      return;
    }

    const payload = {
      email,
      code: String(values.otp),
    };

    try {
      const res = await completeEnrollment(payload).unwrap();
      showCustomToast(res?.message ?? "Account verified successfully", {
        toastOptions: {
          type: "success",
          autoClose: 5000,
        },
      });

      navigate(RouteConstant.auth.signin.path);
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

  const handleResendOtp = async () => {
    if (!canResend || isResending) return;

    if (!email) {
      showCustomToast("Missing email for verification. Please sign up again.", {
        toastOptions: { type: "error", autoClose: 5000 },
      });
      return;
    }

    try {
      const res = await resendOtp({ email }).unwrap();
      showCustomToast(res?.message ?? res?.responseMessage ?? "OTP sent successfully", {
        toastOptions: {
          type: "success",
          autoClose: 5000,
        },
      });
      resetCooldown();
    } catch (error) {
      const message = ErrorHandler.extractMessage(error);
      showCustomToast(message || "Failed to resend OTP", {
        toastOptions: {
          type: "error",
          autoClose: 5000,
        },
      });
    }
  };

  const formik = useFormik({
    initialValues: completeEnrollmentInit,
    onSubmit,
    validationSchema,
  });

  useEffect(() => {
    formik.validateForm();
  }, []);

  return (
    <AuthLayout
      title="Confirm Your OTP"
      subtitle={`Enter the ${otpLength}-digit one-time password (OTP) sent to ${getMaskedEmail(
        email ?? ""
      )} to verify and activate your account.`}
    >
      <div className="flex flex-col gap-3">
        <Textfield
          formik={formik}
          name="otp"
          maxLength={otpLength}
          label="OTP"
          type="number"
          placeholder={`Enter your ${otpLength}-digit OTP`}
          error={
            formik?.touched.otp && formik?.errors.otp ? formik?.errors.otp : ""
          }
        />
        <Button
          label="Verify OTP"
          className="w-full mt-3"
          disabled={!formik?.isValid || isLoading}
          isLoading={isLoading}
          onClick={formik.handleSubmit}
        />
        <p className="text-center mt-2 text-xs text-gray-700">
          Didn't get a code?{" "}
          {canResend ? (
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={isResending}
              className="text-red-700 hover:underline disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isResending ? "Sending..." : "Resend OTP"}
            </button>
          ) : (
            <span className="text-gray-500">
              Resend OTP in {formattedCooldown}
            </span>
          )}
        </p>
      </div>
    </AuthLayout>
  );
};

export default ConfirmAccount;

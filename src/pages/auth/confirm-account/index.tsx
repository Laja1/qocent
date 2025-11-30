/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthLayout from "@/components/layouts/authLayout";
import { getMaskedEmail } from "@/components/not-shared/masked-email";
import { Button, Textfield } from "@/components/shared";
import { showCustomToast } from "@/components/shared/toast";
import { completeEnrollmentInit } from "@/models/request/authRequest";
import { RouteConstant } from "@/router/routes";
import {
  useCompleteEnrollmentMutation,
  useSendOtpMutation,
} from "@/service/python/authApi";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import { confirmAccountSchema } from "@/utilities/schema/authSchema";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ConfirmAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  const [completeEnrollment, { isLoading }] = useCompleteEnrollmentMutation();
  const [resendOtp] = useSendOtpMutation();
  const onSubmit = async (values: any) => {
    const payload = {
      email: state,
      code: String(values?.otp),
    };
    console.log(payload);
    try {
      const res = await completeEnrollment(payload).unwrap();
      showCustomToast(res?.message, {
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

  const ResendOtp = async () => {
    const payload = {
      email: state,
    };
    try {
      const res = await resendOtp(payload).unwrap();
      console.log(res);
      showCustomToast("OTP sent successfully", {
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
    initialValues: completeEnrollmentInit,
    onSubmit,
    validationSchema: confirmAccountSchema,
  });

  useEffect(() => {
    formik.validateForm();
  }, []);
  return (
    <AuthLayout
      title="Confirm Your OTP"
      subtitle={`Enter the one-time password (OTP) sent to ${getMaskedEmail(
        state
      )} to verify and activate your account.`}
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
        <Button
          label="Verify OTP"
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

export default ConfirmAccount;

import { Button, Textfield } from "@/components/shared";
import { showCustomToast } from "@/components/shared/toast";
import { useUpdatePasswordMutation } from "@/service/authApi";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import type { RootState } from "@/store";
import { changePasswordFormValidationSchema } from "@/utilities/schema/authSchema";
import { useFormik } from "formik";
import { EyeClosed, EyeIcon } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

export const Security = () => {
  const [seeCurrentPassword, setSeeCurrentPassword] = useState(false);
  const [seeNewPassword, setSeeNewPassword] = useState(false);
  const [seeConfirmPassword, setSeeConfirmPassword] = useState(false);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: changePasswordFormValidationSchema,
    onSubmit: async (values) => {
      if (!userId) {
        showCustomToast("Unable to update password. Please sign in again.", {
          toastOptions: { type: "error", autoClose: 5000 },
        });
        return;
      }

      try {
        const res = await updatePassword({
          user_id: userId,
          current_password: values.currentPassword,
          new_password: values.password,
          confirm_password: values.confirmPassword,
        }).unwrap();

        showCustomToast(res.message || "Password updated successfully", {
          toastOptions: { type: "success", autoClose: 5000 },
        });
        formik.resetForm();
      } catch (error) {
        showCustomToast(ErrorHandler.extractMessage(error), {
          toastOptions: { type: "error", autoClose: 5000 },
        });
      }
    },
  });

  return (
    <div className="max-w-lg space-y-5">
      <Textfield
        label="Current Password"
        name="currentPassword"
        placeholder="Enter your current password"
        type={seeCurrentPassword ? "text" : "password"}
        suffixIcon={
          <button
            type="button"
            aria-label={seeCurrentPassword ? "Hide password" : "Show password"}
            onClick={() => setSeeCurrentPassword((prev) => !prev)}
          >
            {seeCurrentPassword ? (
              <EyeIcon size={16} />
            ) : (
              <EyeClosed size={16} />
            )}
          </button>
        }
        formik={formik}
        error={
          formik?.touched.currentPassword && formik?.errors.currentPassword
            ? formik?.errors.currentPassword
            : ""
        }
      />
      <Textfield
        label="New Password"
        name="password"
        placeholder="Enter your new password"
        type={seeNewPassword ? "text" : "password"}
        suffixIcon={
          <button
            type="button"
            aria-label={seeNewPassword ? "Hide password" : "Show password"}
            onClick={() => setSeeNewPassword((prev) => !prev)}
          >
            {seeNewPassword ? <EyeIcon size={16} /> : <EyeClosed size={16} />}
          </button>
        }
        formik={formik}
        error={
          formik?.touched.password && formik?.errors.password
            ? formik?.errors.password
            : ""
        }
      />
      <Textfield
        name="confirmPassword"
        label="Confirm Password"
        placeholder="Confirm your new password"
        type={seeConfirmPassword ? "text" : "password"}
        suffixIcon={
          <button
            type="button"
            aria-label={seeConfirmPassword ? "Hide password" : "Show password"}
            onClick={() => setSeeConfirmPassword((prev) => !prev)}
          >
            {seeConfirmPassword ? (
              <EyeIcon size={16} />
            ) : (
              <EyeClosed size={16} />
            )}
          </button>
        }
        formik={formik}
        error={
          formik?.touched.confirmPassword && formik?.errors.confirmPassword
            ? formik?.errors.confirmPassword
            : ""
        }
      />
      <div className="items-right flex justify-end">
        <Button
          label="Save"
          onClick={formik.handleSubmit}
          isLoading={isLoading}
          disabled={!formik.isValid || isLoading}
        />
      </div>
    </div>
  );
};

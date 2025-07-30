import { Button, Textfield } from "@/components/shared";
import { useFormik } from "formik";
import { EyeClosed, EyeIcon } from "lucide-react";
import { useState } from "react";

export const Security = () => {
  const [seePassword, setSeePassword] = useState(false);
  const [newPassword, setNewPasssword] = useState(false);
  const [seeConfirmPassword, setSeeConfirmPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: () => {},
  });
  return (
    <div className="flex gap-3 border p-4 max-w-md flex-col">
      <p>Change Password</p>
      <Textfield
        label="Current Password"
        name="currentPassword"
        placeholder="Enter your current password"
        type={seePassword ? "text" : "password"}
        suffixIcon={
          <button onClick={() => setSeePassword((prev) => !prev)}>
            {seePassword ? <EyeIcon size={16} /> : <EyeClosed size={16} />}
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
        name="New Password"
        placeholder="Enter your new password"
        type={newPassword ? "text" : "password"}
        suffixIcon={
          <button onClick={() => setNewPasssword((prev) => !prev)}>
            {newPassword ? <EyeIcon size={16} /> : <EyeClosed size={16} />}
          </button>
        }
        formik={formik}
        error={
          formik?.touched.newPassword && formik?.errors.newPassword
            ? formik?.errors.newPassword
            : ""
        }
      />
      <Textfield
        name="confirmPassword"
        label="Confirm Password"
        type={seeConfirmPassword ? "password" : "text"}
        suffixIcon={
          <button onClick={() => setSeeConfirmPassword((prev) => !prev)}>
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
        <Button label="Save" />
      </div>
    </div>
  );
};

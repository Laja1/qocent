import AuthLayout from "@/components/layouts/authLayout";
import { Button } from "@/components/shared";
import { Textfield } from "@/components/shared/textfield";
import { signUpInit } from "@/pages/model/request/authRequest";
import { registerFormValidationSchema } from "@/utilities/schema/authSchema";
import { useFormik } from "formik";
import { EyeClosed, EyeIcon } from "lucide-react";
import { useState } from "react";

const SignUp = () => {
  const [seePassword, setSeePassword] = useState(false);
  const [seeConfirmPassword, setSeeConfirmPassword] = useState(false);
  const onSubmit = () => {};
  const formik = useFormik({
    initialValues: signUpInit,
    onSubmit,
    validationSchema:registerFormValidationSchema
  });
  return (
    <AuthLayout title="Sign Up" subtitle="Sign up to your account">
      <div className="gap-3 flex flex-col">
        <div className="flex gap-4">
          <Textfield name="firstName" label="First Name" formik={formik} error={formik?.touched.firstName && formik?.errors.firstName?formik?.errors.firstName:''}/>{" "}
          <Textfield name="lastName" label="Last Name" formik={formik} error={formik?.touched.lastName && formik?.errors.lastName?formik?.errors.lastName:''}/>
        </div>
        <Textfield name="emailAddress" label="Email" formik={formik} error={formik?.touched.emailAddress && formik?.errors.emailAddress?formik?.errors.emailAddress:''} />
        <Textfield
          name="password"
          label="Password"
          type={seePassword ? "password" : "text"}
          suffixIcon={
            <button onClick={() => setSeePassword((prev) => !prev)}>
              {seePassword ? <EyeIcon size={16} /> : <EyeClosed size={16} />}
            </button>
          }
          formik={formik}
          error={formik?.touched.password && formik?.errors.password?formik?.errors.password:''}
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
          error={formik?.touched.confirmPassword && formik?.errors.confirmPassword?formik?.errors.confirmPassword:''}
        />
        <Button label="Sign Up" className="w-full mt-3" />
      </div>
    </AuthLayout>
  );
};
export default SignUp;

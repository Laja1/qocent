import AuthLayout from "@/components/layouts/authLayout";
import { Button, Textfield } from "@/components/shared";
import { signInInit } from "@/pages/model/request/authRequest";
import { loginFormValidationSchema } from "@/utilities/schema/authSchema";
import { useFormik } from "formik";
import { EyeClosed, EyeIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [seePassword, setSeePassword] = useState(false);
  const onSubmit = () => {};
  const formik = useFormik({
    initialValues: signInInit,
    onSubmit,
    validationSchema:loginFormValidationSchema
  });
  const navigate = useNavigate();
  return (
    <AuthLayout
      title="Sign In"
      subtitle="Enter your credentials to access your cloud resources"
    >
      <div className="flex flex-col gap-3">
        <Textfield
          formik={formik}
          name='emailAddress'
          label="Email"
          placeholder="Enter your email"
          error={
            formik?.touched.emailAddress && formik?.errors.emailAddress
              ? formik?.errors.emailAddress
              : ""
          }
        />
        <Textfield
          label="Password"
          name='password'
          placeholder="Enter your password"
          type={seePassword ?  "text":"password" }
          suffixIcon={
            <button onClick={() => setSeePassword((prev) => !prev)}>
              {seePassword ? <EyeIcon size={16} /> : <EyeClosed size={16} />}
            </button>
          }
          formik={formik}
          error={
            formik?.touched.password && formik?.errors.password
              ? formik?.errors.password
              : ""
          }
        />
        <Button
          label="Sign In"
          className="w-full mt-3"
          disabled={!formik?.isValid}
          onClick={() => navigate("/dashboard/server-sites")}
        />
      </div>
    </AuthLayout>
  );
};

export default SignIn;

import AuthLayout from "@/components/layouts/authLayout";
import { Button, SelectField } from "@/components/shared";
import { Textfield } from "@/components/shared/textfield";
import { showCustomToast } from "@/components/shared/toast";
import { signUpInit, type signupRequest } from "@/models/request/authRequest";
import { RouteConstant } from "@/router/routes";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import { useSignUpMutation } from "@/service/kotlin/authApi";
import { registerFormValidationSchema } from "@/utilities/schema/authSchema";
import { useFormik } from "formik";
import { EyeClosed, EyeIcon, Mail, User, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [seePassword, setSeePassword] = useState(false);
  const navigate = useNavigate();
  // const [seeConfirmPassword, setSeeConfirmPassword] = useState(false);
  const [signupMutation, { isLoading, error }] = useSignUpMutation();
  console.log(error);
  const handleSubmit = async (values: signupRequest) => {
    console.log(values, "ss");
    try {
      const res = await signupMutation(values).unwrap();
      console.log(res);
      showCustomToast(res?.responseMessage, {
        toastOptions: {
          type: "success",
          autoClose: 5000,
        },
      });

      navigate(RouteConstant.auth.otp.path, { state: values.userEmail });
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
    initialValues: signUpInit,
    onSubmit: handleSubmit,
    validationSchema: registerFormValidationSchema,
  });
  console.log(formik.errors);
  useEffect(() => {
    formik.validateForm();
  }, []);
  console.log(formik.values);
  return (
    <AuthLayout title="Sign Up" subtitle="Sign up to your account">
      <div className="gap-3 flex flex-col">
        <div className="flex  flex-col gap-4">
          <Textfield
            name="userFirstName"
            label="First Name"
            prefixIcon={<User size={16} />}
            placeholder="Enter your first name"
            formik={formik}
            error={
              formik?.touched.userFirstName && formik?.errors.userFirstName
                ? formik?.errors.userFirstName
                : ""
            }
          />{" "}
          <Textfield
            name="userLastName"
            label="Last Name"
            prefixIcon={<User size={16} />}
            placeholder="Enter your last name"
            formik={formik}
            error={
              formik?.touched.userLastName && formik?.errors.userLastName
                ? formik?.errors.userLastName
                : ""
            }
          />
        </div>
        <Textfield
          name="userEmail"
          label="Email"
          placeholder="Enter your email address"
          formik={formik}
          prefixIcon={<Mail size={16} />}
          error={
            formik?.touched.userEmail && formik?.errors.userEmail
              ? formik?.errors.userEmail
              : ""
          }
        />
        <SelectField
          name="accountType"
          placeholder="Select an account type"
          label="Account Type"
          formik={formik}
          options={[
            { label: "Individual", value: "Individual" },
            { label: "Organization", value: "Organization" },
          ]}
        />
        {formik.values.accountType === "Organization" && (
          <Textfield
            name="accountName"
            label="Account Name"
            placeholder="Enter your account name"
            formik={formik}
            error={
              formik?.touched.accountName && formik?.errors.accountName
                ? formik?.errors.accountName
                : ""
            }
          />
        )}
        <Textfield
          name="userPassword"
          label="Password"
          placeholder="Enter your password"
          prefixIcon={<Lock size={16} />}
          type={seePassword ? "password" : "text"}
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
        {/* <Textfield
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
        /> */}
        <Button
          label="Sign Up"
          className="w-full mt-3"
          disabled={!formik.isValid || isLoading}
          onClick={formik.handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </AuthLayout>
  );
};
export default SignUp;

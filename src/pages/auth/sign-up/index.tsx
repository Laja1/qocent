import AuthLayout from "@/components/layouts/authLayout";
import { Button } from "@/components/shared";
import { Textfield } from "@/components/shared/textfield";
import { showCustomToast } from "@/components/shared/toast";
import { signUpInit, type signupRequest } from "@/models/request/authRequest";
import { RouteConstant } from "@/router/routes";
import { useSignUpMutation } from "@/service/authApi";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import { registerFormValidationSchema } from "@/utilities/schema/authSchema";
import { useFormik } from "formik";
import { EyeClosed, EyeIcon, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [seePassword, setSeePassword] = useState(false);
  const navigate = useNavigate();
  // const [seeConfirmPassword, setSeeConfirmPassword] = useState(false);
  const [signupMutation, { isLoading, error }] = useSignUpMutation();
  console.log(error);
  const handleSubmit = async (values: signupRequest) => {
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

  return (
    <AuthLayout title="Sign Up" subtitle="Sign up to your account">
      <div className="gap-3 flex flex-col">
        <div className="flex  lg:flex-row flex-col gap-4">
          <Textfield
            name="userFirstName"
            label="First Name"
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
          formik={formik}
          suffixIcon={<Mail size={16} />}
          error={
            formik?.touched.userEmail && formik?.errors.userEmail
              ? formik?.errors.userEmail
              : ""
          }
        />
        <Textfield
          name="userPassword"
          label="Password"
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

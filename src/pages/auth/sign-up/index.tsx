/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthLayout from "@/components/layouts/authLayout";
import { Button, SelectField } from "@/components/shared";
import { PhoneField } from "@/components/shared/phonefield";
import { Textfield } from "@/components/shared/textfield";
import { showCustomToast } from "@/components/shared/toast";
import { signUpInit, type signupRequest } from "@/models/request/authRequest";
import { RouteConstant } from "@/router/routes";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import { useSignUpMutation } from "@/service/python/authApi";
import { countryOptions } from "@/utilities/constants/config";
import { registerFormValidationSchema } from "@/utilities/schema/authSchema";
import { useFormik } from "formik";
import { EyeClosed, EyeIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [seePassword, setSeePassword] = useState(false);
  const navigate = useNavigate();
  const [signupMutation, { isLoading }] = useSignUpMutation();
  const handleSubmit = async (values: signupRequest) => {
    // Use the concatenated phone number (phone_code + user_phone_number)
    const submitValues = {
      user_first_name: values.user_first_name,
      user_last_name: values.user_last_name,
      user_email: values.user_email,
      user_country: values.user_country,
      user_password: values.user_password,
      user_phone_number: formik.values.user_phone_number_full,
    };

    console.log(submitValues, "values.user_phone_number");
    try {
      const res = await signupMutation(submitValues).unwrap();

      showCustomToast(res?.message, {
        toastOptions: {
          type: "success",
          autoClose: 5000,
        },
      });

      navigate(RouteConstant.auth.otp.path, { state: values.user_email });
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
    initialValues: {
      ...signUpInit,
      phone_code: "+1",
      user_phone_number_full: "",
    },
    onSubmit: handleSubmit,
    validationSchema: registerFormValidationSchema,
  });

  useEffect(() => {
    formik.validateForm();
  }, []);
  return (
    <AuthLayout title="Sign Up" subtitle="Sign up to your account">
      <div className="gap-3 flex flex-col">
        <div className="flex flex-col gap-4">
          <Textfield
            name="user_first_name"
            label="First Name"
            placeholder="Enter your first name"
            formik={formik}
            error={
              formik?.touched.user_first_name && formik?.errors.user_first_name
                ? formik?.errors.user_first_name
                : ""
            }
          />
          <Textfield
            name="user_last_name"
            label="Last Name"
            placeholder="Enter your last name"
            formik={formik}
            error={
              formik?.touched.user_last_name && formik?.errors.user_last_name
                ? formik?.errors.user_last_name
                : ""
            }
          />
        </div>
        <Textfield
          name="user_email"
          label="Email"
          placeholder="Enter your email address"
          formik={formik}
          error={
            formik?.touched.user_email && formik?.errors.user_email
              ? formik?.errors.user_email
              : ""
          }
        />
        <SelectField
          name="user_country"
          placeholder="Select a country"
          label="Country"
          formik={formik}
          options={countryOptions}
        />

        <PhoneField
          label="Phone number"
          name="user_phone_number"
          formik={formik}
        />
        <Textfield
          name="user_password"
          label="Password"
          placeholder="Enter your password"
          type={seePassword ? "text" : "password"}
          suffixIcon={
            <button onClick={() => setSeePassword((prev) => !prev)}>
              {seePassword ? (
                <EyeIcon size={16} className="text-black" />
              ) : (
                <EyeClosed size={16} className="text-black" />
              )}
            </button>
          }
          formik={formik}
          error={
            formik?.touched.user_password && formik?.errors.user_password
              ? formik?.errors.user_password
              : ""
          }
        />
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

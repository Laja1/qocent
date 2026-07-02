/* eslint-disable @typescript-eslint/no-explicit-any */
import { TermsAndConditionsModal } from "@/components/auth/terms-and-conditions-modal";
import AuthLayout from "@/components/layouts/authLayout";
import { Button, SelectField } from "@/components/shared";
import { PhoneField } from "@/components/shared/phonefield";
import { Textfield } from "@/components/shared/textfield";
import { showCustomToast } from "@/components/shared/toast";
import { Checkbox } from "@/components/ui/checkbox";
import {
  buildBusinessInitPayload,
  buildIndividualSignupPayload,
  signupFormInit,
  type OtpFlowState,
  type SignupAccountType,
  type SignupFormValues,
} from "@/models/request/authRequest";
import { RouteConstant } from "@/router/routes";
import { useInitBusinessMutation, useSignUpMutation } from "@/service/authApi";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import { countryOptions } from "@/utilities/constants/config";
import { signupValidationSchema } from "@/utilities/schema/authSchema";
import { useFormik } from "formik";
import { Building2, EyeClosed, EyeIcon, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type SignUpStep = "select-type" | "details";

const accountTypeOptions: {
  type: SignupAccountType;
  title: string;
  description: string;
  icon: typeof User;
}[] = [
  {
    type: "INDIVIDUAL",
    title: "Individual",
    description: "Create a personal account to manage your own cloud resources.",
    icon: User,
  },
  {
    type: "BUSINESS",
    title: "Business",
    description: "Register your organization and onboard as a business account.",
    icon: Building2,
  },
];

const SignUp = () => {
  const [step, setStep] = useState<SignUpStep>("select-type");
  const [seePassword, setSeePassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [signUp, { isLoading: isSigningUp }] = useSignUpMutation();
  const [initBusiness, { isLoading: isInitBusiness }] = useInitBusinessMutation();
  const isLoading = isSigningUp || isInitBusiness;

  const handleSubmit = async (values: SignupFormValues) => {
    const accountType = values.accountType as SignupAccountType;
    const otpState: OtpFlowState = {
      email:
        accountType === "INDIVIDUAL" ? values.user_email : values.business_email,
      accountType,
    };

    try {
      if (accountType === "INDIVIDUAL") {
        const res = await signUp(buildIndividualSignupPayload(values)).unwrap();
        showCustomToast(res?.message ?? "Sign up successful", {
          toastOptions: { type: "success", autoClose: 5000 },
        });
      } else {
        const res = await initBusiness(buildBusinessInitPayload(values)).unwrap();
        showCustomToast(res?.message ?? "Business registration started", {
          toastOptions: { type: "success", autoClose: 5000 },
        });
      }

      navigate(RouteConstant.auth.otp.path, { state: otpState });
    } catch (error) {
      const message = ErrorHandler.extractMessage(error);
      showCustomToast(message, {
        toastOptions: { type: "error", autoClose: 5000 },
      });
    }
  };

  const formik = useFormik<SignupFormValues>({
    initialValues: signupFormInit,
    onSubmit: handleSubmit,
    validationSchema: signupValidationSchema,
    validateOnMount: true,
  });

  const isBusiness = formik.values.accountType === "BUSINESS";

  useEffect(() => {
    if (step === "details") {
      formik.validateForm();
    }
  }, [step, formik.values.accountType]);

  const handleSelectAccountType = (type: SignupAccountType) => {
    formik.setFieldValue("accountType", type);
    setStep("details");
  };

  const handleBackToTypeSelection = () => {
    setStep("select-type");
    formik.setFieldValue("accountType", "");
    formik.setTouched({});
  };

  if (step === "select-type") {
    return (
      <AuthLayout
        title="Sign Up"
        subtitle="Choose how you want to onboard with Qocent"
      >
        <div className="flex flex-col gap-3">
          {accountTypeOptions.map(({ type, title, description, icon: Icon }) => (
            <button
              key={type}
              type="button"
              onClick={() => handleSelectAccountType(type)}
              className="w-full rounded-md border border-black/10 bg-white p-4 text-left transition hover:border-green-700 hover:shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="rounded-md bg-green-50 p-2 text-green-800">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{title}</p>
                  <p className="mt-1 text-xs text-gray-600">{description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title={isBusiness ? "Business Sign Up" : "Individual Sign Up"}
      subtitle={
        isBusiness
          ? "Enter your business details to get started"
          : "Create your personal Qocent account"
      }
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          formik.handleSubmit();
        }}
        className="flex flex-col gap-3"
      >
        <button
          type="button"
          onClick={handleBackToTypeSelection}
          className="text-left text-xs text-red-700 hover:underline"
        >
          Change account type
        </button>

        {isBusiness ? (
          <>
            <Textfield
              name="business_name"
              label="Business Name"
              placeholder="Enter your business name"
              formik={formik}
              error={
                formik.touched.business_name && formik.errors.business_name
                  ? String(formik.errors.business_name)
                  : ""
              }
            />
            <Textfield
              name="business_email"
              label="Business Email"
              placeholder="Enter your business email"
              formik={formik}
              error={
                formik.touched.business_email && formik.errors.business_email
                  ? String(formik.errors.business_email)
                  : ""
              }
            />
            <SelectField
              name="business_country"
              placeholder="Select a country"
              label="Country"
              formik={formik}
              options={countryOptions}
            />
            <PhoneField
              label="Business Phone"
              name="business_phone"
              formik={formik}
            />
            <Textfield
              name="business_password"
              label="Password"
              placeholder="Create a password"
              type={seePassword ? "text" : "password"}
              suffixIcon={
                <button
                  type="button"
                  aria-label={seePassword ? "Hide password" : "Show password"}
                  onClick={() => setSeePassword((prev) => !prev)}
                >
                  {seePassword ? (
                    <EyeIcon size={16} className="text-black" />
                  ) : (
                    <EyeClosed size={16} className="text-black" />
                  )}
                </button>
              }
              formik={formik}
              error={
                formik.touched.business_password && formik.errors.business_password
                  ? String(formik.errors.business_password)
                  : ""
              }
            />
          </>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              <Textfield
                name="user_first_name"
                label="First Name"
                placeholder="Enter your first name"
                formik={formik}
                error={
                  formik.touched.user_first_name && formik.errors.user_first_name
                    ? String(formik.errors.user_first_name)
                    : ""
                }
              />
              <Textfield
                name="user_last_name"
                label="Last Name"
                placeholder="Enter your last name"
                formik={formik}
                error={
                  formik.touched.user_last_name && formik.errors.user_last_name
                    ? String(formik.errors.user_last_name)
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
                formik.touched.user_email && formik.errors.user_email
                  ? String(formik.errors.user_email)
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
                <button
                  type="button"
                  aria-label={seePassword ? "Hide password" : "Show password"}
                  onClick={() => setSeePassword((prev) => !prev)}
                >
                  {seePassword ? (
                    <EyeIcon size={16} className="text-black" />
                  ) : (
                    <EyeClosed size={16} className="text-black" />
                  )}
                </button>
              }
              formik={formik}
              error={
                formik.touched.user_password && formik.errors.user_password
                  ? String(formik.errors.user_password)
                  : ""
              }
            />
          </>
        )}

        <div className="flex items-center gap-2">
          <Checkbox
            checked={agreedToTerms}
            onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
          />
          <p className="text-sm">
            I agree to the{" "}
            <button
              type="button"
              onClick={() => setTermsModalOpen(true)}
              className="text-green-700 underline hover:text-green-800"
            >
              Terms and Conditions
            </button>
          </p>
        </div>

        <TermsAndConditionsModal
          open={termsModalOpen}
          onOpenChange={setTermsModalOpen}
        />

        <Button
          label="Sign Up"
          className="w-full mt-3"
          type="submit"
          disabled={!formik.isValid || isLoading || !agreedToTerms}
          isLoading={isLoading}
        />
      </form>
    </AuthLayout>
  );
};

export default SignUp;

/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthLayout from "@/components/layouts/authLayout";
import { Button, SelectField, Textfield } from "@/components/shared";
import { showCustomToast } from "@/components/shared/toast";
import { signUpInit, type signupRequest } from "@/models/request/authRequest";
import { RouteConstant } from "@/router/routes";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import { useSignInMutation, useSignUpMutation } from "@/service/kotlin/authApi";
import { registerFormValidationSchema } from "@/utilities/schema/authSchema";
import { useFormik } from "formik";
import {
  EyeClosed,
  EyeIcon,
  Mail,
  User,
  Lock,
  Building2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Globe,
  FileText,
  MailIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { authStore } from "@/store/authSlice";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const [seePassword, setSeePassword] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signupMutation, { isLoading }] = useSignUpMutation();
  const [signIn] = useSignInMutation();

  const businessSizes = [
    { label: "1-10 employees", value: "1-10" },
    { label: "11-50 employees", value: "11-50" },
    { label: "51-200 employees", value: "51-200" },
    { label: "201-500 employees", value: "201-500" },
    { label: "500+ employees", value: "500+" },
  ];

  const calculateProgress = () => {
    return (currentStep / totalSteps) * 100;
  };

  const formik = useFormik({
    initialValues: signUpInit,
    validationSchema: registerFormValidationSchema,
    onSubmit: async (values: signupRequest) => {
      try {
        let submissionData: signupRequest;

        if (values.accountType === "organization") {
          submissionData = {
            ...values,
            business: {
              ...values.business,
              businessContactNumber: "",
            },
          };
        } else {
          submissionData = values;
        }

        const res = await signupMutation(submissionData).unwrap();
        showCustomToast(res?.responseMessage, {
          toastOptions: { type: "success", autoClose: 5000 },
        });
        navigate(RouteConstant.auth.otp.path, { state: values.userEmail });
      } catch (error) {
        const message = ErrorHandler.extractMessage(error);
        showCustomToast(message, {
          toastOptions: { type: "error", autoClose: 5000 },
        });
      }
    },
  });
  const isOrganization = formik.values.accountType === "organization";
  const totalSteps = isOrganization ? 3 : 2;
  useEffect(() => {
    formik.validateForm();
  }, []);

  const handleGoogleSignIn = async (credentialResponse: CredentialResponse) => {
    try {
      setGoogleLoading(true);
      if (!credentialResponse.credential) throw new Error("Missing credential");

      const res = await signIn({
        idToken: credentialResponse.credential,
      }).unwrap();
      dispatch(
        authStore.action.setCredentials({
          token: res.accessToken,
          userEmail: res?.userEmail,
          userFirstName: res?.userFirstName,
          userLastName: res?.userLastName,
          privileges: res?.privileges,
          userId: res?.userId,
        })
      );
      navigate(RouteConstant.dashboard.console.path);
    } catch (error: any) {
      const message =
        ErrorHandler.extractMessage(error) || "Google sign-in failed";
      showCustomToast(message, {
        toastOptions: { type: "error", autoClose: 5000 },
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleGoogleError = () => {
    setGoogleLoading(false);
    showCustomToast("Google sign-in failed. Please try again.", {
      toastOptions: { type: "error", autoClose: 3000 },
    });
  };

  const handleNext = () => {
    if (!canProceedToNextStep()) {
      formik.setTouched({
        userFirstName: true,
        userLastName: true,
        userEmail: true,
        userPassword: true,
        accountType: true,
        ...(currentStep === 2 &&
          isOrganization && {
            business: {
              businessName: true,
              businessDescription: true,
              businessSize: true,
            },
          }),
      });
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      formik.handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const canProceedToNextStep = () => {
    if (currentStep === 1) {
      // Only validate step 1 fields
      const step1Errors = [
        "userFirstName",
        "userLastName",
        "userEmail",
        "userPassword",
        "accountType",
      ].filter((field) => formik.errors[field as keyof typeof formik.errors]);
      return step1Errors.length === 0;
    }

    if (currentStep === 2 && isOrganization) {
      // Validate business fields - check for required fields
      const business = formik.values.business;
      const hasRequiredFields =
        business?.businessName?.trim() &&
        business?.businessContactEmail?.trim() &&
        business?.businessDescription?.trim() &&
        business?.businessSize;

      const businessErrors = formik.errors.business;
      const hasNoErrors =
        !businessErrors || Object.keys(businessErrors).length === 0;

      return hasRequiredFields && hasNoErrors;
    }

    return true;
  };

  console.log(formik.errors);
  const renderStepTitle = () => {
    if (isOrganization) {
      switch (currentStep) {
        case 1:
          return "Personal Information";
        case 2:
          return "Business Details";
        case 3:
          return "Review & Submit";
        default:
          return "Sign Up";
      }
    } else {
      switch (currentStep) {
        case 1:
          return "Personal Information";
        case 2:
          return "Review & Submit";
        default:
          return "Sign Up";
      }
    }
  };

  const renderStepContent = () => {
    // Step 1: Personal Information (Both Individual and Organization)
    if (currentStep === 1) {
      return (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Textfield
              name="userFirstName"
              label="First Name"
              placeholder="Enter your first name"
              prefixIcon={<User size={16} className="text-gray-500" />}
              formik={formik}
            />
            <Textfield
              name="userLastName"
              label="Last Name"
              placeholder="Enter your last name"
              prefixIcon={<User size={16} className="text-gray-500" />}
              formik={formik}
            />
          </div>

          <Textfield
            name="userEmail"
            label="Email"
            placeholder="Enter your email address"
            prefixIcon={<Mail size={16} className="text-gray-500" />}
            formik={formik}
          />

          <SelectField
            name="accountType"
            label="Account Type"
            formik={formik}
            options={[
              { label: "Individual", value: "individual" },
              { label: "Organization", value: "organization" },
            ]}
          />

          <Textfield
            name="userPassword"
            label="Password"
            placeholder="Create a strong password"
            prefixIcon={<Lock size={16} className="text-gray-500" />}
            type={seePassword ? "text" : "password"}
            suffixIcon={
              <button type="button" onClick={() => setSeePassword((p) => !p)}>
                {seePassword ? (
                  <EyeIcon size={16} className="text-gray-500" />
                ) : (
                  <EyeClosed size={16} className="text-gray-500" />
                )}
              </button>
            }
            formik={formik}
          />

          <div className="flex items-center my-3">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">or continue with</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <GoogleLogin
            onSuccess={handleGoogleSignIn}
            onError={handleGoogleError}
            useOneTap={false}
            theme="outline"
            size="large"
            text="continue_with"
            shape="rectangular"
            logo_alignment="left"
            width="100%"
          />

          <Button
            label="Continue"
            className="w-full mt-3"
            surfixIcon={<ArrowRight size={16} />}
            onClick={handleNext}
            disabled={isLoading || googleLoading}
          />
        </div>
      );
    }

    // Step 2: Business Details (Organization only) OR Review (Individual)
    if (currentStep === 2) {
      if (isOrganization) {
        return (
          <div className="flex flex-col gap-4">
            <Textfield
              name="business.businessName"
              label="Business Name"
              placeholder="Enter your business name"
              prefixIcon={<Building2 size={16} className="text-gray-500" />}
              formik={formik}
            />
            <Textfield
              name="business.businessContactEmail"
              label="Business Email"
              type="email"
              placeholder="Enter your business email"
              prefixIcon={<MailIcon size={16} className="text-gray-500" />}
              formik={formik}
            />

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Description
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                <textarea
                  name="business.businessDescription"
                  value={formik.values.business?.businessDescription || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full pl-10 text-xs pr-4 pt-2 border border-gray-300 rounded-xs focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={3}
                  placeholder="Describe what your business does..."
                />
              </div>
            </div>

            <SelectField
              name="business.businessSize"
              label="Company Size"
              placeholder="Select size"
              options={businessSizes}
              formik={formik}
            />

            <Textfield
              name="business.businessWebsite"
              label="Website (Optional)"
              placeholder="https://example.com"
              prefixIcon={<Globe size={16} className="text-gray-500" />}
              formik={formik}
            />

            <div className="flex gap-3 mt-4">
              <Button
                prefixIcon={<ArrowLeft size={16} />}
                label="Back"
                className="flex-1"
                onClick={handleBack}
              />
              <Button
                surfixIcon={<ArrowRight size={16} />}
                label="Continue"
                className="flex-1"
                onClick={handleNext}
              />
            </div>
          </div>
        );
      } else {
        // Individual Review Step
        return (
          <div className="flex flex-col gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">
                Personal Information
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">
                    {formik.values.userFirstName} {formik.values.userLastName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{formik.values.userEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Account Type:</span>
                  <span className="font-medium capitalize">
                    {formik.values.accountType}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <Button
                prefixIcon={<ArrowLeft size={16} />}
                label="Back"
                className="flex-1"
                onClick={handleBack}
              />
              <Button
                surfixIcon={<CheckCircle2 size={16} />}
                label="Create Account"
                className="flex-1"
                onClick={formik.handleSubmit}
                isLoading={isLoading}
              />
            </div>
          </div>
        );
      }
    }

    if (currentStep === 3 && isOrganization) {
      return (
        <div className="flex flex-col gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">
              Personal Information
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Name:</span>
                <span className="font-medium">
                  {formik.values.userFirstName} {formik.values.userLastName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium">{formik.values.userEmail}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Account Type:</span>
                <span className="font-medium capitalize">
                  {formik.values.accountType}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">
              Business Information
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Business Name:</span>
                <span className="font-medium">
                  {formik.values.business?.businessName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Company Size:</span>
                <span className="font-medium">
                  {businessSizes.find(
                    (size) =>
                      size.value === formik.values.business?.businessSize
                  )?.label || "Not specified"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Website:</span>
                <span className="font-medium">
                  {formik.values.business?.businessWebsite || "Not provided"}
                </span>
              </div>
            </div>
          </div>

          {formik.values.business?.businessContactName && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">
                Contact Information
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Contact Name:</span>
                  <span className="font-medium">
                    {formik.values.business?.businessContactName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Role:</span>
                  <span className="font-medium">
                    {formik.values.business?.businessContactRole}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Contact Email:</span>
                  <span className="font-medium">
                    {formik.values.business?.businessContactEmail}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Contact Number:</span>
                  <span className="font-medium">
                    {formik.values.business?.businessContactNumber}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-4">
            <Button
              prefixIcon={<ArrowLeft size={16} />}
              label="Back"
              className="flex-1"
              onClick={handleBack}
            />
            <Button
              surfixIcon={<CheckCircle2 size={16} />}
              label="Create Account"
              className="flex-1"
              onClick={formik.handleSubmit}
              isLoading={isLoading}
            />
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <AuthLayout title="Sign Up" subtitle="Create your account to get started">
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${calculateProgress()}%` }}
        />
      </div>

      {/* Step title */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          {renderStepTitle()}
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Step {currentStep} of {totalSteps}
        </p>
      </div>

      {/* Step content */}
      {renderStepContent()}
    </AuthLayout>
  );
};

export default SignUp;

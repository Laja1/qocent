import AuthLayout from "@/components/layouts/authLayout";
import { Button, Textfield } from "@/components/shared";
import { showCustomToast } from "@/components/shared/toast";
import { RouteConstant } from "@/router/routes";
import { useCompleteBusinessMutation } from "@/service/authApi";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import { businessCompleteValidationSchema } from "@/utilities/schema/authSchema";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CompleteBusiness = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const businessEmail =
    (location.state as { business_email?: string } | null)?.business_email ?? "";
  const [completeBusiness, { isLoading }] = useCompleteBusinessMutation();

  const formik = useFormik({
    initialValues: { business_email: businessEmail, business_display_name: "" },
    validationSchema: businessCompleteValidationSchema,
    onSubmit: async (values) => {
      if (!values.business_email) {
        showCustomToast("Missing business email. Please verify your email again.", {
          toastOptions: { type: "error", autoClose: 5000 },
        });
        navigate(RouteConstant.auth.signup.path);
        return;
      }

      try {
        const res = await completeBusiness(values).unwrap();
        showCustomToast(res?.message ?? "Business registration completed", {
          toastOptions: { type: "success", autoClose: 5000 },
        });
        navigate(RouteConstant.auth.signin.path);
      } catch (error) {
        showCustomToast(ErrorHandler.extractMessage(error), {
          toastOptions: { type: "error", autoClose: 5000 },
        });
      }
    },
  });

  useEffect(() => {
    formik.validateForm();
  }, []);

  return (
    <AuthLayout
      title="Complete Business Setup"
      subtitle="Choose a display name for your business. This will be visible to your team."
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          formik.handleSubmit();
        }}
        className="flex flex-col gap-3"
      >
        <Textfield
          name="business_display_name"
          label="Business Display Name"
          placeholder="e.g. Acme Corporation"
          formik={formik}
          error={
            formik.touched.business_display_name &&
            formik.errors.business_display_name
              ? String(formik.errors.business_display_name)
              : ""
          }
        />
        <Button
          label="Complete Registration"
          className="w-full mt-3"
          type="submit"
          disabled={!formik.isValid || isLoading}
          isLoading={isLoading}
        />
      </form>
    </AuthLayout>
  );
};

export default CompleteBusiness;

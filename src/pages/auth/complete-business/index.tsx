import AuthLayout from "@/components/layouts/authLayout";
import { Button, Textfield } from "@/components/shared";
import { showCustomToast } from "@/components/shared/toast";
import { RouteConstant } from "@/router/routes";
import { useCompleteBusinessMutation } from "@/service/authApi";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import { businessCompleteValidationSchema } from "@/utilities/schema/authSchema";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CompleteBusiness = () => {
  const navigate = useNavigate();
  const [completeBusiness, { isLoading }] = useCompleteBusinessMutation();

  const formik = useFormik({
    initialValues: { business_display_name: "" },
    validationSchema: businessCompleteValidationSchema,
    onSubmit: async (values) => {
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

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "../button";
import { useFormik } from "formik";
import { Textfield } from "../textfield";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { svgLinks } from "@/assets/assetLink";
import { SelectField } from "../selectfield";
import { waitlistInit } from "@/models/request/waitlistRequest";
import { useCreateWaitlistMutation } from "@/service/kotlin/waitlistApi";
import { showCustomToast } from "../toast";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import { waitlistSchema } from "@/utilities/schema/waitlistSchema";

export const BookDemoModal = NiceModal.create(() => {
  const modal = useModal();
  const [bookDemo, { isLoading }] = useCreateWaitlistMutation();

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    const payload = {
      waitlistFullName: values.fullName,
      waitlistEmail: values.email,
      waitlistPhoneNumber: values.mobileNumber,
      waitlistCompanyName: values.companyName,
      waitlistCompanyEmail: values.companyEmail,
      waitlistCompanySize: values.companySize,
      waitlistRole: values.role,
    };

    try {
      const res = await bookDemo(payload).unwrap();
      showCustomToast(res.responseMessage, {
        toastOptions: { type: "success", autoClose: 5000 },
      });
      modal.hide();
    } catch (error) {
      console.log(error);
      const message = ErrorHandler.extractMessage(error);
      showCustomToast(message, {
        toastOptions: { type: "error", autoClose: 5000 },
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Updated formik with correct field names and validation
  const formik = useFormik({
    initialValues: waitlistInit,
    onSubmit: handleSubmit,
    validationSchema: waitlistSchema,
  });

  // Handle cancel button
  const handleCancel = () => {
    formik.resetForm();
    modal.hide();
  };

  // Prevent form submission if there are validation errors
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    e.stopPropagation(); // Stop event propagation

    if (formik.isValid && !isLoading) {
      formik.handleSubmit(e);
    }
  };

  return (
    <Sheet
      open={modal.visible}
      onOpenChange={(open) => {
        if (!open) {
          formik.resetForm();
          modal.hide();
        }
      }}
    >
      <SheetContent className="w-[400px] sm:w-[540px] bg-neutral-800 text-white flex flex-col max-h-screen">
        {/* Header - Fixed at top */}
        <div className="flex-shrink-0 p-4 pb-0">
          <img src={svgLinks.logoWhite} className="size-16 mb-2" alt="Logo" />
          <SheetHeader>
            <SheetTitle className="text-white">Book Demo</SheetTitle>
            <SheetDescription className="text-neutral-300">
              Fill out the form below to schedule a personalized demo of our
              platform.
            </SheetDescription>
          </SheetHeader>
        </div>

        {/* Scrollable form content */}
        <div className="flex-1 overflow-y-auto px-4">
          <form
            onSubmit={handleFormSubmit}
            className="space-y-4 pb-4"
            method="post"
          >
            <div className="space-y-4">
              <Textfield
                label="Full Name *"
                className="text-black"
                name="fullName"
                formik={formik}
                placeholder="John Doe"
              />

              <Textfield
                label="Email *"
                name="email"
                type="email"
                className="text-black"
                formik={formik}
                placeholder="john.doe@example.com"
              />

              <Textfield
                label="Mobile Number *"
                className="text-black"
                name="mobileNumber"
                type="tel"
                formik={formik}
                placeholder="+1 (555) 123-4567"
              />

              <Textfield
                label="Company Name *"
                className="text-black"
                name="companyName"
                formik={formik}
                placeholder="Your Company Inc."
              />

              <Textfield
                label="Company Email *"
                className="text-black"
                name="companyEmail"
                type="email"
                formik={formik}
                placeholder="info@company.com"
              />

              <SelectField
                name="companySize"
                placeholder="Select company size"
                label="Company Size *"
                formik={formik}
                labelClassname="text-white"
                className="text-black"
                options={[
                  { label: "1-10 employees", value: "1-10" },
                  { label: "11-50 employees", value: "11-50" },
                  { label: "51-200 employees", value: "51-200" },
                  { label: "201-500 employees", value: "201-500" },
                  { label: "500+ employees", value: "500+" },
                ]}
              />

              <Textfield
                label="Role *"
                name="role"
                className="text-black"
                formik={formik}
                placeholder="e.g., CTO, DevOps Engineer, IT Manager"
              />
            </div>
          </form>
        </div>

        {/* Footer - Fixed at bottom */}
        <div className="flex-shrink-0 p-4 pt-2 border-t border-neutral-700 bg-neutral-800">
          <div className="flex justify-end space-x-3">
            <Button
              label="Cancel"
              type="button"
              intent="secondary"
              onClick={handleCancel}
            />

            <Button
              type="submit"
              isLoading={isLoading || formik.isSubmitting}
              disabled={!formik.isValid || isLoading || formik.isSubmitting}
              onClick={() => formik.handleSubmit()}
              label="Book Demo"
              className="bg-red-600 hover:bg-red-700 text-white rounded-xs"
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
});

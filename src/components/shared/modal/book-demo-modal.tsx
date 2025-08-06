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

export const BookDemoModal = NiceModal.create(() => {
  const modal = useModal();

  // Updated formik with correct field names and validation
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      mobileNumber: "",
      companyName: "",
      companyEmail: "",
      companySize: "",
      role: "",
    },
    onSubmit: (values) => {
      console.log("Form submitted:", values);
      // Handle form submission logic here
      // For example: call an API, show success message, etc.

      // Close modal after successful submission
      modal.hide();
    },
  });

  // Handle cancel button
  const handleCancel = () => {
    formik.resetForm();
    modal.hide();
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
      <SheetContent className="w-[400px] sm:w-[540px] p-4 bg-neutral-800 text-white">
        <img src={svgLinks.logoWhite} className="size-20" alt="Logo" />
        <SheetHeader>
          <SheetTitle className="text-white">Book Demo</SheetTitle>
          <SheetDescription className="text-neutral-300">
            Fill out the form below to schedule a personalized demo of our
            platform.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="space-y-6">
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

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              label="Cancel"
              type="button"
              intent="secondary"
              onClick={handleCancel}
            />

            <Button
              type="submit"
              label="Book Demo"
              className="bg-red-600 hover:bg-red-700 text-white rounded-xs"
            />
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
});

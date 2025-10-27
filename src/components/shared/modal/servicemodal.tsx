/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogOverlay,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { useFormik } from "formik";
import {
  Button,
  DatePickerWithFormik,
  SelectField,
  Textfield,
} from "@/components/shared";
import { waitlistInit } from "@/models/request/waitlistRequest";
import { waitlistSchema } from "@/utilities/schema/waitlistSchema";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import { showCustomToast } from "../toast";
import { useCreateWaitlistMutation } from "@/service/kotlin/waitlistApi";
import { useState } from "react";
import { imgLinks } from "@/assets/assetLink";

type ServiceModalProps = {
  content: string;
  title: string;
};

export const ServiceModal = NiceModal.create<ServiceModalProps>(
  ({ content, title }) => {
    const [activeStep, setActiveStep] = useState(1); // default to step 1
    const modal = useModal("ServiceModal");
    const [bookDemo, { isLoading }] = useCreateWaitlistMutation();

    const handleSubmit = async (values: any, { setSubmitting }: any) => {
      const payload = {
        waitlistFullName: values.fullName,
        waitlistEmail: values.email,
        waitlistPhoneNumber: values.mobileNumber,
        waitlistCompanyName: values.companyName,
        waitlistCompanyEmail: values.companyEmail,
        waitlistBookingDate: values.waitlistBookingDate,
        waitlistBookingType: title.toLocaleLowerCase(),
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
      <Dialog open={modal.visible} onOpenChange={() => modal.hide()}>
        <DialogOverlay className="bg-black">
          <DialogContent
            className="sm:max-w-[800px] flex bg-black"
            style={{ backgroundColor: "#000" }}
          >
            <div className="flex flex-row w-full">
              {/* Left side image */}
              <div className="w-1/2 flex items-center justify-center">
                <img src={imgLinks.canva} alt="Canva" />
              </div>

              <div className="w-1/2 p-4">
                {activeStep === 1 && (
                  <>
                    <h4 className="text-lg md:text-2xl text-neutral-100 font-bold text-center mb-8">
                      {title}
                    </h4>

                    <ScrollArea className="h-64 rounded-md ">
                      <div className="py-10 mx-5 flex flex-wrap gap-x-4 gap-y-6 items-start justify-start max-w-sm">
                        {content}
                      </div>
                    </ScrollArea>

                    <DialogFooter className="mt-5">
                      <Button
                        type="button"
                        label="Next"
                        onClick={() => setActiveStep(2)}
                      />
                    </DialogFooter>
                  </>
                )}

                {activeStep === 2 && (
                  <>
                    <h4 className="text-lg md:text-2xl text-neutral-100 font-bold text-center mb-8">
                      Book A Session
                    </h4>

                    <ScrollArea className="h-64 rounded-md border">
                      <div className="py-10 mx-5 flex flex-wrap gap-x-4 gap-y-6 items-start justify-start max-w-sm">
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
                                {
                                  label: "201-500 employees",
                                  value: "201-500",
                                },
                                { label: "500+ employees", value: "500+" },
                              ]}
                            />
                            <DatePickerWithFormik
                              name="waitlistBookingDate"
                              formik={formik}
                              label="Select a Date"
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
                    </ScrollArea>

                    <DialogFooter className="mt-5">
                      <DialogClose asChild>
                        <Button
                          type="button"
                          label="Cancel"
                          onClick={handleCancel}
                        />
                      </DialogClose>
                      <Button
                        type="submit"
                        isLoading={isLoading || formik.isSubmitting}
                        disabled={
                          !formik.isValid || isLoading || formik.isSubmitting
                        }
                        onClick={() => formik.handleSubmit()}
                        label="Book Now"
                      />
                    </DialogFooter>
                  </>
                )}
              </div>
            </div>
          </DialogContent>
        </DialogOverlay>
      </Dialog>
    );
  }
);

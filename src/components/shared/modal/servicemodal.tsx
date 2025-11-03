/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { imgLinks } from "@/assets/assetLink";
import {
  Button,
  DatePickerWithFormik,
  SelectField,
  Textfield,
} from "@/components/shared";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogOverlay,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { waitlistInit } from "@/models/request/waitlistRequest";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import { useCreateWaitlistMutation } from "@/service/kotlin/waitlistApi";
import { waitlistSchema } from "@/utilities/schema/waitlistSchema";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { useFormik } from "formik";
import { useState } from "react";
import { showCustomToast } from "../toast";

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
        waitlistEmail: values.companyEmail,
        waitlistPhoneNumber: values.mobileNumber,
        waitlistCompanyName: values.companyName,
        waitlistCompanyEmail: values.businessWebsite,
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

    const handleCancel = () => {
      formik.resetForm();
      setActiveStep(1);
      modal.hide();
    };

    const handleModalClose = () => {
      setActiveStep(1);
      modal.hide();
    };
    return (
      <Dialog open={modal.visible} onOpenChange={handleModalClose}>
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
                    <h4 className="text-lg md:text-2xl  text-neutral-100 font-bold text-center mb-8">
                      {title}
                    </h4>

                    <ScrollArea className="h-64 rounded-md ">
                      <div className="py-10 mx-5 flex flex-wrap gap-x-4 text-white gap-y-6 items-start justify-start max-w-sm">
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
                      Book A {title} Session
                    </h4>

                    <form onSubmit={formik.handleSubmit} method="post">
                      <ScrollArea className="h-64 rounded-md border">
                        <div className="py-10 mx-5 flex flex-wrap gap-x-4 gap-y-6 items-start justify-start max-w-sm">
                          <div className="space-y-4 w-full">
                            <Textfield
                              label="Business Name *"
                              name="companyName"
                              formik={formik}
                              placeholder="e.g., Acme Corp"
                            />

                            <Textfield
                              label="Business Website"
                              name="businessWebsite"
                              formik={formik}
                              placeholder="https://acme.com"
                            />

                            <Textfield
                              label="Business Vertical *"
                              name="businessVertical"
                              formik={formik}
                              placeholder="e.g., FinTech, Healthcare, Logistics"
                            />

                            <Textfield
                              label="Name of Sales Lead *"
                              name="fullName"
                              formik={formik}
                              placeholder="John Doe"
                            />

                            <Textfield
                              label="Contact Number *"
                              name="mobileNumber"
                              type="tel"
                              formik={formik}
                              placeholder="+1 (555) 123-4567"
                            />

                            <Textfield
                              label="Email *"
                              name="companyEmail"
                              type="email"
                              formik={formik}
                              placeholder="john.doe@example.com"
                            />

                            <SelectField
                              name="companySize"
                              placeholder="Select company size"
                              label="Company Size"
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
                              label="Preferred Booking Date"
                            />

                            <Textfield
                              label="Role / Title"
                              name="role"
                              className="text-black"
                              formik={formik}
                              placeholder="e.g., CTO, Project Manager"
                            />
                          </div>
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
                          label="Book Now"
                        />
                      </DialogFooter>
                    </form>
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

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik";
import { resourceModalSchema } from "@/utilities/schema/resourceSchema";
import { motion } from "framer-motion";
import { RouteConstant } from "@/router/routes";
import { AnimatePresence } from "motion/react";
import { Dialog } from "@headlessui/react";
import { Button, ComboBoxField } from "@/components/shared";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useGetServicesQuery } from "@/service/kotlin/serviceApi";

interface ResourceModalProps {
  id?: string;
  siteCodeId?: number;
  closeModal: () => void;
  onProceed?: () => void;
  onNavigate?: (path: string, state?: any) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const ResourceModal: React.FC<ResourceModalProps> = ({
  id,
  onProceed,
  closeModal,
  onNavigate,
  isOpen,
  onClose,
}) => {
  const dashboard = useSelector((state: RootState) => state.dashboard);
  const { data: getServicesData } = useGetServicesQuery({
    provider: dashboard.provider,
  });

  // Transform the API data to match the expected format
  const presetTypeOptions = id
    ? [{ label: id, value: id.toLowerCase() }]
    : getServicesData?.data?.map((service: any) => ({
        label: service.serviceName,
        value: service.serviceName,
      })) || [];

  const formik = useFormik({
    initialValues: {
      resourceType: id?.toLowerCase() || "",
    },
    validationSchema: resourceModalSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      // Ensure we have a valid resourceType before proceeding
      if (!values.resourceType) {
        console.error("No resource type selected");
        return;
      }

      closeModal();
      onProceed?.();

      // Pass the state properly - ensure it's always an object
      onNavigate?.(RouteConstant.dashboard.createResources.path, {
        resourceType: values.resourceType,
        selectedField,
      });
    },
  });
  const selectedField = getServicesData?.data.find(
    (item) => item.serviceName === formik.values.resourceType
  );
  console.log(selectedField, "getServicesData");
  useEffect(() => {
    formik.validateForm();
  }, []); // Empty dependency array - only run once on mount

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          static
          open={isOpen}
          onClose={onClose}
          className="relative z-50"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50"
          />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-md w-full max-w-md shadow-lg">
              <div className="border-b mb-5">
                <p className="text-base uppercase font-semibold text-gray-800">
                  Deploy Resources
                </p>
                <p className="text-sm mt-1 text-green-900">
                  Select the resource you want to deploy and target site.
                </p>
              </div>
              <form
                onSubmit={formik.handleSubmit}
                className="gap-3 flex flex-col"
              >
                <ComboBoxField
                  name="resourceType"
                  label="Resource Type"
                  placeholder="Select a resource type"
                  formik={formik}
                  options={presetTypeOptions}
                />

                <div className="flex justify-end gap-3 pt-4 border-t mt-6">
                  <Button
                    label="Cancel"
                    type="button"
                    intent="secondary"
                    onClick={closeModal}
                  />
                  <Button
                    label="Proceed"
                    type="submit"
                    intent="primary"
                    disabled={!formik.isValid || !formik.values.resourceType}
                  />
                </div>
              </form>
            </div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

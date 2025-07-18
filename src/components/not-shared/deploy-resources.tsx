/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik";
import { Button, ComboBoxField } from "../shared";
import { resourceSiteCodeOptions, resourceTypeOptions } from "./deploy-config";
import { deployModalSchema } from "@/utilities/schema/resourceSchema";
import { useEffect } from "react";
import type { ServerRoomType } from "@/utilities/constants/config";
import { RouteConstant } from "@/router/routes";

type DeployResourceProps = {
  id?: string;
  siteCodeId?: number;
  closeModal: () => void;
  onProceed?: () => void;
  onNavigate?: (path: string, state?: any) => void; // Add this prop
};

export const serverRooms: ServerRoomType[] = [
  {
    siteId: 100001,
    siteName: "Rubies Production Site",
    siteProvider: "AWS",
    siteCode: "Rub-Prod-Site-1",
    siteStatus: "Active",
    siteCreatedAt: "2025-01-09",
  },
  {
    siteId: 100002,
    siteName: "Qoovest",
    siteCode: "Qoov-Prod-Site-1",
    siteStatus: "Active",
    siteProvider: "Huawei",
    siteCreatedAt: "2025-01-09",
  },
  {
    siteId: 100003,
    siteName: "Qoonity",
    siteProvider: "Huawei",
    siteCode: "Qoon-Prod-Site-1",
    siteStatus: "Active",
    siteCreatedAt: "2025-01-09",
  },
  {
    siteId: 100004,
    siteProvider: "AWS",
    siteCode: "NC-Prod-Site-1",
    siteName: "NCube",
    siteStatus: "Active",
    siteCreatedAt: "2025-01-09",
  },
  {
    siteId: 100005,
    siteName: "Tymer",
    siteProvider: "AWS",
    siteCode: "Tymer-Prod-Site-1",
    siteStatus: "Suspended",
    siteCreatedAt: "2025-01-09",
  },
  {
    siteId: 100006,
    siteName: "Tymer",
    siteProvider: "AWS",
    siteCode: "Tymer-Prod-Site-1",
    siteStatus: "Suspended",
    siteCreatedAt: "2025-01-09",
  },
];

export const DeployResources = ({
  id,
  siteCodeId,
  onProceed,
  closeModal,
  onNavigate, 
}: DeployResourceProps) => {
  const serverSite = serverRooms.find((item) => item.siteId === siteCodeId);
  console.log(serverSite);
  
  const typeOption = resourceSiteCodeOptions.find((item) => item.label === id);
  console.log(typeOption);

  const presetTypeOptions = id
    ? [{ label: id, value: id.toLowerCase() }]
    : resourceTypeOptions;

  const formik = useFormik({
    initialValues: {
      resourceType: id?.toLowerCase() || "",
    },
    onSubmit: (values) => {
      console.log("Deploying for ID:", id, "with values:", values);
      closeModal();
      onProceed?.();
      // Use the passed navigation function instead of useNavigate
      onNavigate?.(RouteConstant.dashboard.createResources.path, values.resourceType);
    },
    validationSchema: deployModalSchema,
  });

  useEffect(() => {
    formik!.validateForm();
  }, []);
  
  console.log(formik?.values);

  const handleProceed = () => {
    if (formik.isValid) {
      formik.handleSubmit();
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className="p-4 space-y-4">
      <div className="border-b pb-2">
        <p className="text-base uppercase font-semibold text-gray-800">
          Deploy Resources
        </p>
        <p className="text-sm mt-1 text-green-900">
          Select the resource you want to deploy and target site.
        </p>
      </div>

      <div className="flex flex-col gap-4 text-sm text-gray-700">
        <ComboBoxField
          name="resourceType"
          label="Resource Type"
          placeholder="Select a resource type"
          formik={formik}
          options={presetTypeOptions}
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button
          label="Cancel"
          type="button"
          intent="secondary"
          onClick={closeModal}
        />
        <Button
          label="Proceed"
          type="button"
          intent="primary"
          onClick={handleProceed}
          disabled={!formik.isValid}
        />
      </div>
    </form>
  );
};
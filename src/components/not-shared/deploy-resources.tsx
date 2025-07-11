import { useFormik } from "formik";
import { Button, ComboBoxField, SelectField2 } from "../shared";
import { resourceSiteCodeOptions, resourceTypeOptions } from "./deploy-config";
import { deployModalSchema } from "@/utilities/schema/resourceSchema";
import { useEffect } from "react";
import type { ServerRoomType } from "@/utilities/constants/config";

type DeployResourceProps = {
  id?: string;
  siteCodeId?: number;
  closeModal: () => void;
  onProceed?: () => void;
};

export const serverRooms: ServerRoomType[] = [
  {
  siteId: 100001,
    siteName: "Rubies Production Site",
    // alerts: 0,
    siteProvider: "AWS",
    siteCode: "Rub-Prod-Site-1",
    siteStatus: "Active",
    siteCreatedAt: "2025-01-09",
    // bill: 76902.0,
    // balance: 7718.0,
  },
  {
  siteId: 100002,
    siteName: "Qoovest",
    
    // alerts: 5,
    siteCode: "Qoov-Prod-Site-1",
    siteStatus: "Active",
    siteProvider: "Huawei",
    siteCreatedAt: "2025-01-09",
    // bill: 11671.0,
    // balance: 547.0,
  },
  {
  siteId: 100003,
    siteName: "Qoonity",
    siteProvider: "Huawei",
    siteCode: "Qoon-Prod-Site-1",
    // alerts: 9,
    siteStatus: "Active",
    siteCreatedAt: "2025-01-09",
    // bill: 87829.0,
    // balance: 4877.0,
  },
  {
  siteId: 100004,
    siteProvider: "AWS",
    siteCode: "NC-Prod-Site-1",
    siteName: "NCube",
    // alerts: 15,
    siteStatus: "Active",
    siteCreatedAt: "2025-01-09",
    // bill: 75488.0,
    // balance: 2267.0,
  },
  {
  siteId: 100005,
    siteName: "Tymer",
    siteProvider: "AWS",
    siteCode: "Tymer-Prod-Site-1",
    
    siteStatus: "Suspended",
    siteCreatedAt: "2025-01-09",
    // bill: 74891.0,
    // balance: 6397.0,
  },
  {
  siteId: 100006,
    siteName: "Tymer",
    siteProvider: "AWS",
    siteCode: "Tymer-Prod-Site-1",
    // houses: "4",
    // alerts: 6,
    siteStatus: "Suspended",
    siteCreatedAt: "2025-01-09",
    // bill: 74891.0,
    // balance: 6397.0,
  },
]

export const DeployResources = ({
  id,
  siteCodeId,
  onProceed,
  closeModal,
}: DeployResourceProps) => {
  const serverSite = serverRooms.find((item) => item.siteId === siteCodeId);
  console.log(serverSite);
  const typeOption = resourceSiteCodeOptions.find((item) => item.label === id);
  console.log(typeOption);
  const presetSiteOptions = serverSite
  ? [{ label: serverSite.siteName, value: serverSite.siteId.toString() }]
  : resourceSiteCodeOptions;


  const presetTypeOptions = id
    ? [{ label: id, value: id.toLowerCase() }]
    : resourceTypeOptions;

  const formik = useFormik({
    initialValues: {
      resourceType: id?.toLowerCase() || "",
      resourceSiteCode: serverSite?.siteId || "",
    },
    onSubmit: (values) => {
      console.log("Deploying for ID:", id, "with values:", values);
      closeModal();
      onProceed?.(); // ← trigger navigation
    },
    validationSchema: deployModalSchema,
  });

  useEffect(() => {
    formik!.validateForm();
  }, []);

  return (
    <form onSubmit={formik.handleSubmit} className="p-4 min-w-md space-y-4">
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
        <SelectField2
          name="resourceSiteCode"
          label="Resource Site Code"
          formik={formik}
          placeholder="Select a site code"
          options={presetSiteOptions}
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
          type="submit"
          intent="primary"
          disabled={!formik.isValid}
        />
      </div>
    </form>
  );
};

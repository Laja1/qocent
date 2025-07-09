import { useFormik } from "formik";
import { Button, ComboBoxField, SelectField2 } from "../shared";
import { serverRooms } from "@/utilities/constants/config";
import { resourceSiteCodeOptions, resourceTypeOptions } from "./deploy-config";

type DeployResourceProps = {
  id?: string;
  siteCodeId?: string;
  closeModal: () => void;
};

export const DeployResources = ({
  id,
  siteCodeId,
  closeModal,
}: DeployResourceProps) => {
  const serverSite = serverRooms.find((item) => item.id === siteCodeId);

  const presetSiteOptions = serverSite
    ? [{ label: serverSite.siteName, value: serverSite.id }]
    : resourceSiteCodeOptions;

  const presetTypeOptions = id
    ? [{ label: id, value: id.toLowerCase() }]
    : resourceTypeOptions;

  const formik = useFormik({
    initialValues: {
      resourceType: id?.toLowerCase() || "",
      resourceSiteCode: serverSite?.id || "",
      resourceSiteHouse:"",
      resourceSiteRoom:""
    },
    onSubmit: (values) => {
      console.log("Deploying for ID:", id, "with values:", values);
      closeModal();
    },
  });



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
 <SelectField2
          name="resourceSiteHouse"
          label="Resource Site House"
          formik={formik}
          placeholder="Select a site house"
          options={presetSiteOptions}
        />
        <SelectField2
          name="resourceSiteRoom"
          label="Resource Site Room"
          formik={formik}
          disabled={!formik.values.resourceSiteCode}
          placeholder="Select a site room"
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
      <Button label="Proceed" type="submit" intent="primary" onClick={()=>{
        window.location= "/create-new-resource" as (string & Location)
      }}/>
      </div>
    </form>
  );
};

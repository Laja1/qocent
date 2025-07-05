/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Header, SelectField2 } from "@/components/shared";
import mapBackendToInitialValues from "@/models/request/resourceRequest";
import { useFormik } from "formik";
import { backendResponse } from "./config";
import { createValidationSchema } from "./validation";
import { getIn } from "formik";
import RenderField from "./renderfield";
import { useMemo } from "react";

export const CreateResource = () => {
  const onSubmit = (values: any) => {
    console.log("Submitted values:", values);
  };

  // Generate Resource Type options from backend data
  const resourceTypeOptions = useMemo(() => {
    return (
      backendResponse.data[0]?.fieldDropdowns?.map((dropdown) => ({
        label: dropdown.dropdownName,
        value: dropdown.dropdownValue,
      })) || []
    );
  }, []);

  // Mock options for Resource Site Code - replace with your actual data
  const resourceSiteCodeOptions = [
    { label: "Rubies Production Site A", value: "rubies-site-a" },
    { label: "Rubies Production Site B", value: "rubies-site-b" },
    { label: "Rubies Production Site C", value: "srubies-site-c" },
  ];

  const formik = useFormik({
    initialValues: {
      resourceType: "",
      resourceSiteCode: "",
      nestedFields: [],
    },
    onSubmit,
    validationSchema: createValidationSchema(backendResponse?.data),
    enableReinitialize: true,
  });

  // Handle Resource Type dropdown change
  const handleResourceTypeChange = (value: string) => {
    formik.setFieldValue("resourceType", value);

    // Find the selected resource type data
    const selectedResourceType = backendResponse.data[0]?.fieldDropdowns?.find(
      (dropdown) => dropdown.dropdownValue === value
    );

    if (selectedResourceType?.nestedFields) {
      // Map the nested fields for the selected resource type
      const mappedNestedFields = mapBackendToInitialValues(
        selectedResourceType.nestedFields
      );
      formik.setFieldValue("nestedFields", mappedNestedFields);
    } else {
      // Clear nested fields if no selection
      formik.setFieldValue("nestedFields", []);
    }
  };

  // Handle Resource Site Code dropdown change
  const handleResourceSiteCodeChange = (value: string) => {
    formik.setFieldValue("resourceSiteCode", value);
    // Add any additional logic here if site code affects the form
  };

  // Only show nested fields if both dropdowns are selected
  const shouldShowNestedFields =
    formik.values.resourceType && formik.values.resourceSiteCode;

  console.log("Form values:", formik.values);
  console.log("Form errors:", formik.errors);

  return (
    <div className="flex flex-col">
      <Header
        title="Create Resources"
        description="A server Room can have one or more server centres. A server centre is provided by a provider."
      />

      <div className="flex-col p-5 mt-5  space-y-5 rounded-sm">
        <div className="grid grid-cols-4 flex w-full gap-3  space-y-5">
          <SelectField2
            name="resourceType"
            label="Resource Type"
            placeholder="Select a resource type"
            formik={formik}
            
            options={resourceTypeOptions}
            onChange={handleResourceTypeChange}
          />
          <SelectField2
            name="resourceSiteCode"
            label="Resource Site Code"
            formik={formik}
            placeholder="Select a site code"
            options={resourceSiteCodeOptions}
            onChange={handleResourceSiteCodeChange}
          />
           {shouldShowNestedFields &&
            formik.values.nestedFields.map((field, index) => (
              <RenderField
                key={index}
                field={field}
                formik={formik}
                fieldPath={`nestedFields[${index}]`}
                error={getIn(
                  formik.errors,
                  `nestedFields[${index}].selectedOption`
                )}
              />
            ))}
        </div>
      </div>

      <div className="flex w-full gap-3">
        <div className=" flex flex-col gap-4 rounded-sm p-4 w-[400px]">
          {/* Show message when dropdowns are not selected */}
          {/* {!shouldShowNestedFields && (
            <div className="text-gray-500 text-center p-8 border-2 border-dashed border-gray-300 rounded-md">
              Please select both Resource Type and Resource Site Code to
              configure your resource.
            </div>
          )} */}

         <div className="w-[400px] gap-3">
          {/* {shouldShowNestedFields &&
            formik.values.nestedFields.map((field, index) => (
              <RenderField
                key={index}
                field={field}
                formik={formik}
                fieldPath={`nestedFields[${index}]`}
                error={getIn(
                  formik.errors,
                  `nestedFields[${index}].selectedOption`
                )}
              />
            ))} */}
            </div>

          {shouldShowNestedFields && (
            <div className="flex justify-end">
              <Button
                label="Create Resource"
                className=""
                disabled={!formik.isValid}
                onClick={formik.handleSubmit}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

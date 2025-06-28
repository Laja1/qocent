/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Header } from "@/components/shared";
import mapBackendToInitialValues from "@/models/request/resourceRequest";
import { useFormik } from "formik";
import { backendResponse } from "./config";
import { createValidationSchema } from "./validation";
import { getIn } from "formik";
import RenderField from "./RenderField";

export const CreateResource = () => {
  const onSubmit = (values: any) => {
    console.log("Submitted values:", values);
  };

  const formik = useFormik({
    initialValues: {
      // selectedProduct: "",
      nestedFields: mapBackendToInitialValues(backendResponse.data),
    },
    onSubmit,
    validationSchema: createValidationSchema(backendResponse?.data),
    enableReinitialize: true,
  });

  console.log(formik.errors?.nestedFields);
  return (
    <div className="flex flex-col">
      <Header
        title="Create Resources"
        description="A server Room can have one or more server centres. A server centre is provided by a provider."
      />

      <div className="flex gap-3 mx-5 my-5">
        <div className="w-full flex flex-col gap-4 rounded-sm p-4 ">
          {formik.values.nestedFields.map((field, index) => (
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

          <div className="flex justify-end">
            <Button
              label="Create Resource"
              className="mt-2"
              disabled={!formik.isValid}
              onClick={formik.handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

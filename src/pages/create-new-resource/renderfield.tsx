/* eslint-disable @typescript-eslint/no-explicit-any */
import { SelectField2, Textfield2 } from "@/components/shared";
import type { DynamicFormField } from "@/models/request/resourceRequest";
import mapBackendToInitialValues from "@/models/request/resourceRequest";
import { getIn } from "formik";
import { useCallback } from "react";

interface RenderFieldProps {
  field: DynamicFormField;
  formik: any;
  fieldPath: string;
  error?: string;
}

export default function RenderField({
  field,
  formik,
  fieldPath,
  error,
}: RenderFieldProps) {
  const name = `${fieldPath}.selectedOption`;

  // Generate dropdown options from fieldDropdowns
  const options = field.fieldDropdowns?.map((dropdown) => ({
    label: dropdown.dropdownName,
    value: dropdown.dropdownValue,
  })) || [];

 
  const handleDropdownChange = useCallback((value: string) => {
    // Set the selected value
    formik.setFieldValue(name, value);

    // Handle nested fields based on selection
    if (field.fieldInputType === "dropdown") {
      const selectedDropdown = field.fieldDropdowns?.find(
        (dropdown) => dropdown.dropdownValue === value
      );

      if (selectedDropdown?.nestedFields) {
        // Map the nested fields to form structure
        const mappedNestedFields = mapBackendToInitialValues(selectedDropdown.nestedFields);
        formik.setFieldValue(`${fieldPath}.nestedFields`, mappedNestedFields);
      } else {
        // Clear nested fields if no nested fields for selected option
        formik.setFieldValue(`${fieldPath}.nestedFields`, []);
      }
    }
  }, [field.fieldDropdowns, field.fieldInputType, fieldPath, formik, name]);

  return (
    <div className="mb-4 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        <label className="text-sm font-medium text-gray-700 block">
          {field.fieldName}
        </label>
<div>
        {field.fieldInputType === "dropdown" ? (
          <SelectField2
            name={name}
            placeholder="Select an option"
            formik={formik}
            className="w-full"
            options={options}
            onChange={handleDropdownChange}
          />
        ) : (
          <Textfield2
            name={name}
            type={field.fieldInputType}
            placeholder={`Enter ${field.fieldName}`}
            formik={formik}
            className="w-full"
          />
        )}
        {error && (
        <p className="text-sm  text-red-500 mt-1">{error}</p>
      )}
      </div>
      </div>
      

      {/* Render nested fields if they exist */}
      {field.nestedFields && field.nestedFields.length > 0 && (
        <div className="w-full mt-4  border-gray-200 ">
          {field.nestedFields.map((nestedField, index) => (
            <RenderField
              key={`${fieldPath}.nestedFields[${index}]`}
              field={nestedField}
              formik={formik}
              fieldPath={`${fieldPath}.nestedFields[${index}]`}
              error={getIn(
                formik.errors,
                `${fieldPath}.nestedFields[${index}].selectedOption`
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
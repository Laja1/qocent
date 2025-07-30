/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextArea, Textfield2 } from "@/components/shared";
import { DatePickerWithFormik } from "@/components/shared/date-picker";
import type { FormikProps } from "formik";
import { ResourceSelectField } from "../not-shared/resource-selectfield";

type RenderFieldProps = {
  type: string;
  name: string;
  label?: string;
  formik: FormikProps<any>;
  placeholder?: string;
  parameterLookup?: string;
  autoComplete?: string; // Add this line
};

export const RenderField = ({
  type,
  name,
  placeholder,
  label,
  formik,
  parameterLookup,
  autoComplete = "off", // Default to "off"
  ...rest
}: RenderFieldProps) => {
  const error = formik.touched[name] && formik.errors[name];

  return (
    <div className="w-full">
      {type === "Textbox" && (
        <Textfield2
          name={name}
          label={label}
          placeholder={placeholder}
          formik={formik}
          error={error as string}
          className="w-full"
          autoComplete={autoComplete} // Pass it down
          {...rest}
        />
      )}
      {type === "CidrBlock" && (
        <Textfield2
          name={name}
          label={label}
          placeholder={placeholder}
          formik={formik}
          error={error as string}
          className="w-full"
          autoComplete={autoComplete} // Pass it down
          {...rest}
        />
      )}
      {type === "CommentBox" && (
        <TextArea
          name={name}
          label={label}
          placeholder={placeholder}
          formik={formik}
          error={error as string}
          className="w-full"
          autoComplete={autoComplete} // Pass it down
          {...rest}
        />
      )}
      {type === "ListBox" && (
        <ResourceSelectField
          name={name}
          parameterLookup={parameterLookup || ""}
          formik={formik}
          placeholder={placeholder}
          {...rest}
        />
      )}
      {type === "DateBox" && (
        <DatePickerWithFormik
          name={name}
          label={label}
          formik={formik}
          className="w-full"
          placeholder={placeholder}
          dateFormat="MMM dd, yyyy"
          outputFormat="yyyy-MM-dd"
          error={error as string}
          // autoComplete={autoComplete}
          {...rest}
        />
      )}
    </div>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { SelectField2, TextArea, Textfield2 } from "@/components/shared";
import { DatePickerWithFormik } from "@/components/shared/date-picker";
import type { FormikProps } from "formik";

type RenderFieldProps = {
  type: string;
  name: string;
  label?: string;
  formik: FormikProps<any>;
  options: { label: string; value: string }[];
  placeholder?: string;
  autoComplete?: string; // Add this line
};

export const RenderField = ({
  type,
  name,
  placeholder,
  label,
  formik,
  options,
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
        <SelectField2
          name={name}
          label={label}
          options={options}
          placeholder={placeholder}
          formik={formik}
          error={error as string}
          className="w-full"
          // autoComplete={autoComplete}/
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
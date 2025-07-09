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
};

export const RenderField = ({
  type,
  name,
  placeholder,
  label,
  formik,
  options,
  ...rest
}: RenderFieldProps) => {
  return (
    <div className="w-full">
      {type === "Textbox" && (
        <Textfield2
          name={name}
          label={label}
          placeholder={placeholder}
          formik={formik}
          className="w-full"
          {...rest}
        />
      )}
      {type === "CommentBox" && (
        <TextArea
          name={name}
          label={label}
          className="w-full"
          placeholder={placeholder}
          formik={formik}
          {...rest}
        />
      )}
      {type === "ListBox" && (
        <SelectField2
          name={name}
          label={label}
          options={options}
          placeholder={placeholder}
          className="w-full"
          formik={formik}
          {...rest}
        />
      )}
      {type === "DateBox" && (
        <DatePickerWithFormik
          formik={formik}
          name={name}
          className="w-full"
          label={label}
          placeholder={placeholder}
          dateFormat="MMM dd, yyyy"
          outputFormat="yyyy-MM-dd"
          {...rest}
        />
      )}
    </div>
  );
};

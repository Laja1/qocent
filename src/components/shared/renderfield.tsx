/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextArea, Textfield2 } from "@/components/shared";
import { DatePickerWithFormik } from "@/components/shared/date-picker";
import type { FormikProps } from "formik";
import { ResourceSelectField } from "../not-shared/resource-selectfield";
import { useState } from "react";
import { EyeClosed, EyeIcon, Lock } from "lucide-react";

type RenderFieldProps = {
  type: string;
  name: string;
  label?: string;
  formik: FormikProps<any>;
  placeholder?: string;
  options: [];
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
  options,
  autoComplete = "off", // Default to "off"
  ...rest
}: RenderFieldProps) => {
  const [seePassword, setSeePassword] = useState(false);
  const error = formik.touched[name] && formik.errors[name];

  return (
    <div className="w-full">
      {(type === "Textbox" ||
        type === "TextBox" ||
        type === "NoTrailTextField" ||
        type === "CidrBlock") && (
        <Textfield2
          name={name}
          label={label}
          placeholder={placeholder}
          formik={formik}
          error={error as string}
          className="w-full"
          autoComplete={autoComplete}
          {...rest}
        />
      )}
      {type === "Number" && (
        <Textfield2
          name={name}
          label={label}
          type="number"
          placeholder={placeholder}
          formik={formik}
          error={error as string}
          className="w-full"
          autoComplete={autoComplete}
          {...rest}
        />
      )}
      {type === "PasswordBox" && (
        <Textfield2
          name={name}
          label={label}
          placeholder="Enter your password"
          formik={formik}
          className="w-full"
          prefixIcon={<Lock size={16} className="text-black" />}
          type={seePassword ? "text" : "password"}
          suffixIcon={
            <button onClick={() => setSeePassword((prev) => !prev)}>
              {seePassword ? (
                <EyeIcon size={16} className="text-black" />
              ) : (
                <EyeClosed size={16} className="text-black" />
              )}
            </button>
          }
          error={error as string}
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
          option={options}
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

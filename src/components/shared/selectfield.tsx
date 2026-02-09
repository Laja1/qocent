import clsx from "clsx";
import { getIn } from "formik";
import type { SelectfieldOptions, SelectProps } from "./types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const SelectField = ({
  error,
  placeholder,
  label,
  name,
  formik,
  options,
  labelClassname,
  value,
  className,
}: SelectProps) => {
  // ✅ Use getIn to safely access nested formik values and errors
  const fieldValue = value ?? getIn(formik?.values, name) ?? "";
  const fieldError = error ?? getIn(formik?.errors, name);
  const touched = getIn(formik?.touched, name);
  const displayError = touched && fieldError;

  const selectfieldClasses = clsx(
    "block w-full bg-white text-black border border-gray-300 rounded-xs py-3 px-3 text-xs focus:outline-none focus:ring-0.5 focus:ring-green-700 focus:border-green-700",
    className,
    { "border-red-500": displayError }
  );

  const handleChange = (selectedValue: string) => {
    if (formik) {
      formik.setFieldValue(name, selectedValue);
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className={clsx(
            "text-sm text-gray-600",
            labelClassname
          )}
        >
          {label}
        </label>
      )}

      <div className="relative mt-1 bg-white">
        <Select value={fieldValue} onValueChange={handleChange}>
          <SelectTrigger
            id={name}
            className={clsx(
              selectfieldClasses,
              "cursor-pointer flex items-center justify-between"
            )}
          >
            <SelectValue
              placeholder={placeholder || "Select an option"}
              className="flex-grow placeholder:text-black"
            />
          </SelectTrigger>

          <SelectContent>
            {options?.map(({ label, value }: SelectfieldOptions) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {displayError && (
        <p className="text-red-500 text-xs my-1">{displayError}</p>
      )}
    </div>
  );
};

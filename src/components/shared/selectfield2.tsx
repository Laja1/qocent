import clsx from "clsx";
import type { SelectfieldOptions, SelectProps } from "./types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { getIn } from "formik";

export const SelectField2 = ({
  error,
  placeholder,
  label,
  name,
  formik,
  options,
  labelClassname,
  value,
  className,
  onChange, // Add custom onChange prop
}: SelectProps & { onChange?: (value: string) => void }) => {
  const selectfieldClasses = clsx(
    "block w-full placeholder:text-[#000] bg-white font-normal items-center border border-gray-300 placeholder:font-light px-3 placeholder:text-[8px] inset-ring-green-800 ring-2 ring-green-800 text-xs border-0 shadow-sm leading-6 disabled:text-gray-400 disabled:cursor-not-allowed focus:ring-[1px] focus:ring-primary rounded-xs",
    className
  );

  const handleChange = (selectedValue: string) => {
    if (onChange) {
      // Use custom onChange if provided (for our dynamic nested fields)
      onChange(selectedValue);
    } else if (formik) {
      // Default formik behavior
      formik.setFieldValue(name, selectedValue);
    }
  };

  // Use getIn for nested field names like "nestedFields[0].selectedOption"
  const selectedValue = value || (formik ? getIn(formik.values, name) : "") || "";

  return (
    <div className="w-full">
      <div className="flex flex-col mb-1  items-start gap-2">
        {label && (
          <label htmlFor={name} className={`text-sm text-tetiary-lighter ${labelClassname}`}>
            {label}
          </label>
        )}
      </div>
      <div className="relative w-full">
        <Select value={selectedValue} onValueChange={handleChange}>
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
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </div>
  );
};

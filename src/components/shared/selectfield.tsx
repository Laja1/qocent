import clsx from "clsx";
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
  value,
  className,
}: SelectProps) => {
  const selectfieldClasses = clsx(
    "block w-full placeholder:text-[#000] bg-white font-normal items-center border border-gray-300   placeholder:font-light  px-3 placeholder:text-[8px] inset-ring-green-800 ring-1 ring-green-800 text-xs border-0 shadow-sm  leading-6 disabled:text-gray-400 disabled:cursor-not-allowed focus:ring-[1px] focus:ring-primary rounded-xs",
    className
  );

  const handleChange = (selectedValue: string) => {
    if (formik) {
      formik.setFieldValue(name, selectedValue);
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="text-sm text-tetiary-lighter">
          {label}
        </label>
      )}
      <div className="relative mt-1">
        <Select
          value={value || formik?.values[name] || ""}
          onValueChange={handleChange}
        >
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
      {error && <p className="text-red-500 text-xs my-1">{error}</p>}
    </div>
  );
};

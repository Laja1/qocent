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
  labelClassname,
  value,
  className,
}: SelectProps) => {
  const selectfieldClasses = clsx(
    "block w-full bg-white text-black border border-gray-300 rounded-xs py-3 px-3 text-xs focus:outline-none focus:ring-0.5 focus:ring-green-700 focus:border-green-700 ",
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
        <label
          htmlFor={name}
          className={`text-sm text-gray-600 dark:text-white ${labelClassname}`}
        >
          {label}
        </label>
      )}
      <div className="relative mt-1 bg-white">
        <Select
        
          value={value || formik?.values[name] || ""}
          onValueChange={handleChange}
        >
          <SelectTrigger
            id={name}
            className={clsx(
              selectfieldClasses,
              "cursor-pointer flex items-center justify-between "
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

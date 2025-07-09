import clsx from "clsx";
import type { SelectfieldOptions, SelectProps } from "./types";
import { getIn } from "formik";

export const SelectField2 = ({
  error,
  placeholder,
  label,
  name,
  formik,
  disabled,
  options,
  labelClassname,
  value,
  className,
  onChange, 
}: SelectProps & { onChange?: (value: string) => void }) => {
  const selectfieldClasses = clsx(
    "block w-full placeholder:text-[#000] py-[9px] text-[12px] bg-white font-normal items-center border border-green-800  px-2 focus:ring-1 focus:ring-green-800 shadow-sm disabled:text-gray-400 disabled:cursor-not-allowed  rounded-xs cursor-pointer",
    className
  );
  
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    
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
      <div className="flex flex-col items-start gap-2">
        {label && (
          <label htmlFor={name} className={`text-sm text-tetiary-lighter ${labelClassname}`}>
            {label}
          </label>
        )}
      </div>
      <div className="relative w-full">
        <select
          id={name}
          name={name}
          value={selectedValue}
          onChange={handleChange}
          disabled={disabled}
          className={selectfieldClasses}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options?.map(({ label, value }: SelectfieldOptions) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </div>
  );
};
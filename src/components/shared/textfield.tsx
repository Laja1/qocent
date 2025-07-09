import clsx from "classnames";
import type { textfieldProps } from "./types";
import { Search } from "lucide-react";
import { useMemo } from "react";

export const Textfield = ({
  type = "text",
  label,
  error,
  disabled = false,
  prefixIcon,
  suffixIcon,
  placeholder,
  className,
  searchField,
  name,
  labelClassName,
  formik,
  ...rest
}: textfieldProps) => {
  // Memoize the prefix icon calculation
  const computedPrefixIcon = useMemo(() => {
    return searchField ? (
      <Search className="text-gray-400 h-5 w-5" aria-hidden="true" />
    ) : (
      prefixIcon
    );
  }, [searchField, prefixIcon]);

  // Memoize the textfield classes
  const textfieldClasses = useMemo(() => {
    const textfieldBaseClass = `block w-full bg-white border border-gray-300 rounded-xs py-2 px-3 text-xs focus:outline-none focus:ring-0.5 focus:ring-green-700 focus:border-green-700`;
    const textfieldState = error ? "ring-red-500" : "ring-[#E8EAEB]";
    
    return clsx(
      textfieldBaseClass,
      textfieldState,
      computedPrefixIcon ? "pl-10" : "px-3",
      suffixIcon ? "pr-10" : "pr-3",
      className
    );
  }, [error, computedPrefixIcon, suffixIcon, className]);

  // Get the field value safely
  const fieldValue = formik?.values?.[name] ?? "";

  return (
    <div className="w-full text-start">
      <label className={clsx("text-sm text-tetiary-lighter", labelClassName)}>
        {label}
      </label>

      <div className="mt-1 relative rounded-lg w-full">
        {!!computedPrefixIcon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            {computedPrefixIcon}
          </div>
        )}

        {suffixIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {suffixIcon}
          </div>
        )}

        <input
          type={type}
          name={name}
          disabled={disabled}
          placeholder={placeholder}
          onBlur={formik?.handleBlur}
          onChange={formik?.handleChange}
          value={fieldValue}
          {...rest}
          className={textfieldClasses}
        /> 
      </div>

      {error && (
        <p className="text-red-500 text-xs text-left items-start mt-2">
          {error}
        </p>
      )}
    </div>
  );
};
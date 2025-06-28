/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from "classnames";
import type { textfieldProps } from "./types";
import { Search } from "lucide-react";
import { useMemo } from "react";
import { getIn } from "formik";

export const Textfield2 = ({
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
    const textfieldBaseClass = `block w-full bg-white border border-gray-300 rounded-xs py-3 px-3 text-xs inset-ring-2 inset-ring-green-800 focus:ring-1 focus:ring-green-900 focus:border-black`;
    const textfieldState = error ? "ring-red-500" : "ring-[#E8EAEB]";

    return clsx(
      textfieldBaseClass,
      textfieldState,
      computedPrefixIcon ? "pl-10" : "px-3",
      suffixIcon ? "pr-10" : "pr-3",
      className
    );
  }, [error, computedPrefixIcon, suffixIcon, className]);

  // Get the field value safely using getIn for nested paths
  const fieldValue = formik ? getIn(formik.values, name) || "" : "";

  // Handle change for nested fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formik) {
      formik.setFieldValue(name, e.target.value);
    }
  };

  // Handle blur for nested fields
  const handleBlur = () => {
    if (formik) {
      formik.setFieldTouched(name, true);
    }
  };

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
          onBlur={handleBlur}
          onChange={handleChange}
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

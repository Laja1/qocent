import clsx from "classnames";
import type { textfieldProps } from "./types";
import { Search } from "lucide-react";

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
  const textfieldBaseClass = `block w-full bg-white border border-gray-300 rounded-md py-3 px-3 text-xs inset-ring-2 inset-ring-green-800 focus:ring-1 focus:ring-green-900 focus:border-black`;

  const textfieldState = error ? "ring-red-500" : "ring-[#E8EAEB]";

  const newPrefixIcon = searchField ? (
    <Search className="text-gray-400 h-5 w-5" aria-hidden="true" />
  ) : (
    prefixIcon
  );

  const textfieldClasses = clsx(
    textfieldBaseClass,
    textfieldState,
    newPrefixIcon ? "pl-10" : "px-3",
    suffixIcon ? "pr-10" : "pr-3",
    className
  );

  return (
    <div className="w-full text-start">
      <label className={clsx("text-sm text-tetiary-lighter", labelClassName)}>
        {label}
      </label>

      <div className="mt-1 relative rounded-lg w-full">
        {!!newPrefixIcon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            {newPrefixIcon}
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
          value={formik?.values[name]}
          onBlur={formik?.handleBlur}
          onChange={formik?.handleChange}
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

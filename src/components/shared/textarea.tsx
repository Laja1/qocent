/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from "clsx";
import type { textfieldProps } from "./types";
import { useMemo } from "react";
import { getIn } from "formik";

export const TextArea = ({
  label,
  error,
  disabled = false,
  placeholder,
  className,
  name,
  labelClassName,
  formik,
  rows = 2, // Default rows for textarea
  ...rest
}: Omit<
  textfieldProps,
  "type" | "prefixIcon" | "suffixIcon" | "searchField"
> & {
  rows?: number;
}) => {
  // Memoize the textarea classes
  const textareaClasses = useMemo(() => {
    const textareaBaseClass = `block w-full bg-white text-black  rounded-xs py-1 px-3 text-xs border focus:ring-1 focus:ring-green-900 focus:border-black resize-vertical min-h-[60px]`;
    const textareaState = error
      ? "border-red-500 ring-red-500"
      : "border-green-800";

    return clsx(
      textareaBaseClass,
      textareaState,
      disabled && "opacity-50 cursor-not-allowed bg-gray-50",
      className
    );
  }, [error, disabled, className]);

  // Get the field value safely using getIn for nested paths
  const fieldValue = formik ? getIn(formik.values, name) || "" : "";

  // Handle change for nested fields
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
    <div className="w-full items-start flex-col flex text-start">
      {label && (
        <label
          htmlFor={name}
          className={clsx("text-xs mb-1 text-tetiary-lighter", labelClassName)}
        >
          {label}
        </label>
      )}

      <div className="relative rounded-lg w-full">
        <textarea
          id={name}
          name={name}
          disabled={disabled}
          placeholder={placeholder}
          onBlur={handleBlur}
          onChange={handleChange}
          value={fieldValue}
          rows={rows}
          {...rest}
          className={textareaClasses}
        />
      </div>

      {error && <p className="text-red-500 text-xs text-left mt-2">{error}</p>}
    </div>
  );
};

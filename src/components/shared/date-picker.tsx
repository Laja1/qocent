/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import clsx from "clsx";
import type { FormikProps } from "formik";
import { useState } from "react";

interface DatePickerProps {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  name?: string;
  label?: string;
  error?: string;
  dateFormat?: string;
  outputFormat?: string;
  labelClassName?: string;
  calendarClassName?: string;
  triggerClassName?: string;
  yearRange?: { start: number; end: number }; // Optional year range for dropdown
}

export const DatePicker = ({
  value,
  onChange,
  placeholder = "Pick a date",
  disabled = false,
  className,
  name,
  label,
  error,
  dateFormat = "PPP",
  labelClassName,
  calendarClassName,
  triggerClassName,
  yearRange = { start: 1900, end: new Date().getFullYear() + 10 }, // Default 1900-current year+10
}: DatePickerProps) => {
  const [open, setOpen] = useState(false);

  const defaultTriggerClasses = clsx(
    "w-full justify-start text-left font-normal py-1 bg-white rounded-xs px-3 py-2 flex items-center border justify-center border-green-800  text-xs cursor-pointer",
    disabled && "opacity-50 cursor-not-allowed",
    triggerClassName
  );

  const handleDateSelect = (date: Date | undefined) => {
    onChange(date);
    setOpen(false); // Close calendar after selection
  };

  return (
    <div className={clsx("w-full", className)}>
      {label && (
        <label
          htmlFor={name}
          className={clsx(
            "text-sm text-tetiary-lighter mb-1 block",
            labelClassName
          )}
        >
          {label}
        </label>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div
            id={name}
            className={defaultTriggerClasses}
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-label={label || "Date picker"}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? (
              format(value, dateFormat)
            ) : (
              <span className="text-gray-500">{placeholder}</span>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex items-center justify-between">
            <Calendar
              mode="single"
              selected={value}
              onSelect={handleDateSelect}
              className={clsx("rounded-xs border", calendarClassName)}
              disabled={disabled}
              captionLayout="dropdown"
              fromYear={yearRange.start}
              toYear={yearRange.end}
            />
          </div>
        </PopoverContent>
      </Popover>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

// Formik version remains the same
interface DatePickerWithFormikProps
  extends Omit<DatePickerProps, "value" | "onChange"> {
  formik?: FormikProps<any>;
  name: string;
  onChange?: (value: string) => void;
}

export const DatePickerWithFormik = ({
  formik,
  name,
  onChange,
  outputFormat = "yyyy-MM-dd",
  ...props
}: DatePickerWithFormikProps) => {
  const fieldValue = formik?.values[name];
  const selectedDate = fieldValue ? new Date(fieldValue) : undefined;
  const error =
    formik?.errors[name] && formik?.touched[name]
      ? formik.errors[name]
      : props.error;

  const handleDateChange = (date: Date | undefined) => {
    const formattedDate = date ? format(date, outputFormat) : "";

    if (onChange) {
      onChange(formattedDate);
    }

    if (formik) {
      formik.setFieldValue(name, formattedDate);
    }
  };

  return (
    <DatePicker
      {...props}
      value={selectedDate}
      onChange={handleDateChange}
      error={typeof error === "string" ? error : undefined}
    />
  );
};

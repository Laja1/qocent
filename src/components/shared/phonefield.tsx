/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import clsx from "classnames";
import { type FormikProps } from "formik";
import { usePhoneCountries } from "@/hooks/usePhoneCountries";

type PhoneFieldProps = {
  name: string;
  label?: string;
  className?: string;
  formik: FormikProps<any>;
  labelClassName?: string;
};

export const PhoneField = ({
  name,
  label,
  className,
  labelClassName,
  formik,
}: PhoneFieldProps) => {
  const countries = usePhoneCountries();
  const [open, setOpen] = useState(false);

  const selectedCode = countries.find(
    (c) => c.value === formik.values.phone_code
  );

  const fieldValue = formik.values?.[name] ?? "";

  const textfieldClasses = useMemo(
    () =>
      clsx(
        "flex-1 bg-transparent text-black text-sm focus:outline-none placeholder-gray-400",
        className
      ),
    [className]
  );

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const number = e.target.value;
    const code = formik.values.phone_code || "";

    formik.setFieldValue(name, number);
    formik.setFieldValue(`${name}_full`, code + number);
  };

  const handleSelect = (country: any) => {
    const phoneNumber = formik.values[name] || "";
    formik.setFieldValue("phone_code", country.value);
    formik.setFieldValue(`${name}_full`, country.value + phoneNumber);
    setOpen(false);
  };

  return (
    <div className="w-full text-start relative">
      {label && (
        <label className={clsx("text-sm text-white", labelClassName)}>
          {label}
        </label>
      )}

      <div
        className={clsx(
          "mt-1 flex items-center gap-2 border  px-3 py-1 bg-white",
          "border-gray-300"
        )}
      >
        {/* Custom flag dropdown */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          {selectedCode ? (
            <img
              src={selectedCode.label}
              alt="flag"
              className="w-6 h-4 rounded-sm object-cover"
            />
          ) : (
            <div className="w-6 h-6 bg-gray-200 " />
          )}

          <span>{formik.values.phone_code || ""}</span>
        </div>

        {/* Phone number input */}
        <input
          type="number"
          name={name}
          placeholder="Enter phone number"
          value={fieldValue}
          onChange={handlePhoneChange}
          className={textfieldClasses}
        />
      </div>

      {/* Dropdown list */}
      {open && (
        <div className="absolute z-20 bg-black w-full max-h-40 overflow-y-auto mt-1 border  shadow-lg">
          {countries.map((c, index) => (
            <div
              key={index}
              onClick={() => handleSelect(c)}
              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800 cursor-pointer"
            >
              <img
                src={c.label}
                alt="flag"
                className="w-6 h-4 rounded-sm object-cover"
              />
              <span>{c.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

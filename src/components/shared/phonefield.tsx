/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "classnames";
import { getIn, type FormikProps } from "formik";
import { ChevronDown } from "lucide-react";
import {
  DEFAULT_PHONE_CODE,
  PHONE_COUNTRY_CODES,
  type PhoneCountry,
} from "@/utilities/constants/phoneCountries";

type PhoneFieldProps = {
  name: string;
  label?: string;
  className?: string;
  formik: FormikProps<any>;
  labelClassName?: string;
  placeholder?: string;
};

const sanitizePhoneDigits = (value: string) => value.replace(/\D/g, "");

const buildFullNumber = (code: string, localNumber: string) =>
  `${code}${sanitizePhoneDigits(localNumber)}`;

export const PhoneField = ({
  name,
  label,
  className,
  labelClassName,
  placeholder = "Enter phone number",
  formik,
}: PhoneFieldProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<PhoneCountry>(
    () =>
      PHONE_COUNTRY_CODES.find((c) => c.code === DEFAULT_PHONE_CODE) ??
      PHONE_COUNTRY_CODES[0]
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const phoneCode = formik.values.phone_code || DEFAULT_PHONE_CODE;
  const fieldValue = getIn(formik.values, name) ?? "";

  const touched = getIn(formik.touched, name);
  const errorMessage = getIn(formik.errors, name);
  const displayError = touched && errorMessage;

  const filteredCountries = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return PHONE_COUNTRY_CODES;
    return PHONE_COUNTRY_CODES.filter(
      (c) =>
        c.country.toLowerCase().includes(q) ||
        c.code.includes(q.replace(/\s/g, ""))
    );
  }, [search]);

  const updatePhoneValues = (code: string, localNumber: string) => {
    const digits = sanitizePhoneDigits(localNumber);
    formik.setFieldValue(name, digits);
    formik.setFieldValue(`${name}_full`, buildFullNumber(code, digits));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setSearch("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updatePhoneValues(phoneCode, e.target.value);
  };

  const handleCountrySelect = (country: PhoneCountry) => {
    setSelectedCountry(country);
    formik.setFieldValue("phone_code", country.code);
    updatePhoneValues(country.code, fieldValue);
    setOpen(false);
    setSearch("");
  };

  const handleBlur = () => {
    formik.setFieldTouched(name, true);
  };

  const inputClasses = useMemo(
    () =>
      clsx(
        "flex-1 min-w-0 bg-transparent text-black text-xs focus:outline-none placeholder:text-gray-400",
        className
      ),
    [className]
  );

  const wrapperClasses = clsx(
    "mt-1 flex items-center gap-2 border rounded-md bg-white py-2 px-3 text-xs focus-within:ring-0.5 focus-within:ring-green-700 focus-within:border-green-700",
    displayError
      ? "border-red-500 ring-red-500"
      : "border-black/10 ring-[#E8EAEB]"
  );

  return (
    <div className="w-full text-start" ref={containerRef}>
      {label && (
        <label htmlFor={name} className={clsx("text-sm", labelClassName)}>
          {label}
        </label>
      )}

      <div className={wrapperClasses}>
        <div className="relative flex-shrink-0">
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="flex items-center gap-1.5 pr-2 border-r border-gray-200 text-xs text-gray-900 hover:text-black"
            aria-label="Select country code"
            aria-expanded={open}
          >
            <span className="text-base leading-none">{selectedCountry.flag}</span>
            <span className="font-medium">{phoneCode}</span>
            <ChevronDown className="size-3.5 text-gray-500" />
          </button>

          {open && (
            <div className="absolute left-0 top-[calc(100%+6px)] z-30 w-64 rounded-md border border-gray-200 bg-white shadow-lg">
              <div className="p-2 border-b border-gray-100">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search country or code"
                  className="w-full rounded border border-gray-200 px-2 py-1.5 text-xs focus:outline-none focus:border-gray-400"
                  autoFocus
                />
              </div>
              <ul className="max-h-48 overflow-y-auto py-1">
                {filteredCountries.length === 0 ? (
                  <li className="px-3 py-2 text-xs text-gray-500">
                    No countries found
                  </li>
                ) : (
                  filteredCountries.map((country) => (
                    <li key={`${country.code}-${country.country}`}>
                      <button
                        type="button"
                        onClick={() => handleCountrySelect(country)}
                        className={clsx(
                          "w-full flex items-center gap-2 px-3 py-2 text-left text-xs hover:bg-gray-50",
                          country.code === selectedCountry.code &&
                            country.country === selectedCountry.country &&
                            "bg-gray-50"
                        )}
                      >
                        <span className="text-base leading-none">
                          {country.flag}
                        </span>
                        <span className="flex-1 truncate text-gray-800">
                          {country.country}
                        </span>
                        <span className="text-gray-500">{country.code}</span>
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
        </div>

        <input
          id={name}
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          name={name}
          placeholder={placeholder}
          value={fieldValue}
          onChange={handlePhoneChange}
          onBlur={handleBlur}
          className={inputClasses}
        />
      </div>

      {typeof displayError === "string" && (
        <p className="text-red-500 text-xs text-left mt-2">{displayError}</p>
      )}
    </div>
  );
};

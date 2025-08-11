/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from "react";
import { type FormikProps } from "formik";
import { SelectField } from "../shared";
import { useGetFormOptionsMutation } from "@/service/kotlin/serviceApi";
import { IconRefresh } from "@tabler/icons-react";

type ResourceSelectFieldProps = {
  name: string;
  label?: string;
  formik: FormikProps<any>;
  placeholder?: string;
  parameterLookup: string;
};

export const ResourceSelectField = ({
  name,
  label,
  formik,
  placeholder,
  parameterLookup,
}: ResourceSelectFieldProps) => {
  const [getFormOptions, { isLoading }] = useGetFormOptionsMutation();
  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    []
  );
  const [fetchError, setFetchError] = useState<string | null>(null);

  const processParameterLookup = useCallback(
    (lookup: string, formValues: any) => {
      // Handle array format: [qcs_eolAction, actionCode, actionProvider=@siteProvider]
      if (lookup.startsWith("[") && lookup.endsWith("]")) {
        // Remove brackets and split by semicolon
        const cleanLookup = lookup.slice(1, -1);
        const parts = cleanLookup.split(";").map((part) => part.trim());

        // Process each part to replace placeholders
        const processedParts = parts.map((part) => {
          // Check if this part contains a key-value pair with placeholder
          if (part.includes("=@")) {
            // Extract the key and placeholder: houseSite=@resourceSite
            const [key, placeholder] = part.split("=");
            const fieldName = placeholder.replace("@", ""); // Remove @ symbol

            // Handle field names with spaces by trying both formats
            const formValue =
              formValues[fieldName] ||
              formValues[fieldName.replace(/([A-Z])/g, " $1").trim()];

            if (formValue) {
              return `${key.trim()}='${formValue}'`;
            } else {
              // If the referenced field has no value, keep the original placeholder
              return part;
            }
          } else if (part.includes("@")) {
            // Handle direct placeholder replacement (not in key=value format)
            return part.replace(/@(\w+)/g, (match, fieldName) => {
              const formValue =
                formValues[fieldName] ||
                formValues[fieldName.replace(/([A-Z])/g, " $1").trim()];
              return formValue || match;
            });
          }

          // Return the part as-is if no placeholders found
          return part;
        });

        return `[${processedParts.join("; ")}]`;
      }

      // Handle simple string format with placeholders
      return lookup.replace(/@(\w+)/g, (match, fieldName) => {
        // Handle field names with spaces by trying both formats
        return (
          formValues[fieldName] ||
          formValues[fieldName.replace(/([A-Z])/g, " $1").trim()] ||
          match
        );
      });
    },
    []
  );

  // Check if all required dependencies are available
  const checkDependencies = useCallback((lookup: string, formValues: any) => {
    const placeholderMatches = lookup.match(/@(\w+)/g);
    if (!placeholderMatches) return { ready: true, missing: [] };

    const missingFields = placeholderMatches
      .map((match) => match.replace("@", ""))
      .filter((fieldName) => {
        // Handle field names with spaces by trying both formats
        return (
          !formValues[fieldName] &&
          !formValues[fieldName.replace(/([A-Z])/g, " $1").trim()]
        );
      });

    return {
      ready: missingFields.length === 0,
      missing: missingFields,
    };
  }, []);

  // Function to filter and process options from API response
  const processOptions = useCallback(
    (rawOptions: { label: string; value: string }[]) => {
      if (!Array.isArray(rawOptions)) {
        return [];
      }

      return rawOptions
        .filter((option) => {
          // Filter out options with empty values or invalid data
          return option.value && option.value.trim() !== "" && option.label;
        })
        .map((option) => ({
          label: option.label,
          value: option.value,
          // Optionally, you could add a fallback value if needed:
          // value: option.value || `option-${index}-${Date.now()}`
        }));
    },
    []
  );

  const handleFetchOptions = useCallback(async () => {
    try {
      setFetchError(null);

      const dependencies = checkDependencies(parameterLookup, formik.values);
      console.log(formik.values, "rurur");
      if (!dependencies.ready) {
        setFetchError(
          `Please select: ${dependencies.missing.join(", ")} first`
        );
        setOptions([]);
        return;
      }

      const processedLookup = processParameterLookup(
        parameterLookup,
        formik.values
      );
      console.log(processedLookup, "ssss");
      const res = await getFormOptions({ query: processedLookup });
      console.log(res);

      if (res?.data?.responseCode === "00" && Array.isArray(res.data.data)) {
        const processedOptions = processOptions(res.data.data);
        setOptions(processedOptions);

        // Optionally log filtered out items for debugging
        const filteredCount = res.data.data.length - processedOptions.length;
        if (filteredCount > 0) {
          console.warn(
            `Filtered out ${filteredCount} options with empty values`
          );
        }
      } else {
        setFetchError(res?.data?.responseMessage || "Failed to fetch options");
        setOptions([]);
      }
    } catch (error) {
      console.error("Error fetching options:", error);
      setFetchError("Failed to load options. Please try again.");
      setOptions([]);
    }
  }, [
    getFormOptions,
    parameterLookup,
    formik.values,
    processParameterLookup,
    checkDependencies,
    processOptions,
  ]);

  const error =
    formik.touched[name] && formik.errors[name]
      ? (formik.errors[name] as string)
      : undefined;

  const getPlaceholderText = () => {
    if (isLoading) return "Loading options...";
    if (fetchError) return "Error loading options";
    if (options.length === 0) {
      const dependencies = checkDependencies(parameterLookup, formik.values);

      if (!dependencies.ready) {
        return `Select ${dependencies.missing.join(", ")} first`;
      }
      return placeholder || "Click 'Fetch options' to load...";
    }
    return "Choose a resource...";
  };

  const dependencies = checkDependencies(parameterLookup, formik.values);
  const isDisabled = options.length === 0 || isLoading || !dependencies.ready;

  return (
    <div className="flex items-center gap-2 w-full">
      <div className="flex-1">
        <SelectField
          name={name}
          label={label}
          options={options}
          placeholder={getPlaceholderText()}
          formik={formik}
          error={error}
          disabled={isDisabled}
          className="w-full"
        />
        {fetchError && (
          <p className="text-red-500 text-xs mt-1">{fetchError}</p>
        )}
      </div>

      <button
        type="button"
        onClick={handleFetchOptions}
        disabled={isLoading || !dependencies.ready}
        className={`
    group relative inline-flex items-center justify-center gap-1.5
    px-3 py-1.5 text-xs font-semibold
    bg-white hover:bg-green-50 active:bg-green-100
    text-slate-700 hover:text-green-700
    border border-slate-200 hover:border-green-300
    rounded-xs shadow-xs
    transition-all duration-200 ease-out
    min-w-[70px] h-7
    disabled:opacity-40 disabled:cursor-not-allowed
    disabled:hover:bg-white disabled:hover:text-slate-700 
    disabled:hover:border-slate-200 disabled:hover:shadow-sm
    focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-400
    overflow-hidden
    ${isLoading ? "cursor-wait" : ""}
  `}
        aria-label="Fetch options"
        title={
          !dependencies.ready
            ? `Select ${dependencies.missing.join(", ")} first`
            : "Fetch options"
        }
      >
        {/* Background gradient effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <IconRefresh
          className={`size-3 flex-shrink-0 z-10 transition-all duration-300 ${
            isLoading
              ? "animate-spin text-green-600"
              : "group-hover:rotate-180 group-hover:text-green-600"
          }`}
        />

        <span className="relative z-10 font-medium">
          {isLoading ? "Loading..." : "Fetch"}
        </span>

        {/* Shimmer effect when loading */}
        {isLoading && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-pulse" />
        )}
      </button>
    </div>
  );
};

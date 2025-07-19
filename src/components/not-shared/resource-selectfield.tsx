/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from "react";
import { type FormikProps } from "formik";
import { SelectField } from "../shared";
import { useGetFormOptionsMutation } from "@/service/resourceApi";

type ResourceSelectFieldProps = {
  name: string;
  label?: string;
  formik: FormikProps<any>;
  placeholder?: string;
  parameterLookup: string; // the key that maps to optionsMap
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

  // Function to replace placeholders in parameterLookup with actual form values
  const processParameterLookup = useCallback((lookup: string, formValues: any) => {
    // Handle array format: [qcs_eolAction, actionCode, actionProvider=@siteProvider]
    if (lookup.startsWith('[') && lookup.endsWith(']')) {
      // Remove brackets and split by comma
      const cleanLookup = lookup.slice(1, -1);
      const parts = cleanLookup.split(',').map(part => part.trim());
      
      // Process each part to replace placeholders
      const processedParts = parts.map(part => {
        if (part.includes('=@')) {
          // Extract the key and placeholder: actionProvider=@siteProvider
          const [key, placeholder] = part.split('=');
          const fieldName = placeholder.replace('@', ''); // Remove @ symbol
          const formValue = formValues[fieldName];
          
          if (formValue) {
            return `${key.trim()}='${formValue}'`;
          } else {
            // If the referenced field has no value, keep the placeholder
            return part;
          }
        }
        return part;
      });
      
      return `[${processedParts.join(', ')}]`;
    }
    
    // Handle simple string format with placeholders
    return lookup.replace(/@(\w+)/g, (match, fieldName) => {
      return formValues[fieldName] || match;
    });
  }, []);

  // Check if all required dependencies are available
  const checkDependencies = useCallback((lookup: string, formValues: any) => {
    const placeholderMatches = lookup.match(/@(\w+)/g);
    if (!placeholderMatches) return { ready: true, missing: [] };
    
    const missingFields = placeholderMatches
      .map(match => match.replace('@', ''))
      .filter(fieldName => !formValues[fieldName]);
    
    return {
      ready: missingFields.length === 0,
      missing: missingFields
    };
  }, []);

  const handleFetchOptions = useCallback(async () => {
    try {
      setFetchError(null);
      
      const dependencies = checkDependencies(parameterLookup, formik.values);
      
      if (!dependencies.ready) {
        setFetchError(`Please select: ${dependencies.missing.join(', ')} first`);
        setOptions([]);
        return;
      }
      
      const processedLookup = processParameterLookup(parameterLookup, formik.values);
      console.log('Original lookup:', parameterLookup);
      console.log('Processed lookup:', processedLookup);
      console.log('Current form values:', formik.values);
      
      const res = await getFormOptions({ query: processedLookup });

      if (res?.data?.success && Array.isArray(res.data.data)) {
        setOptions(res.data.data);
      } else {
        setFetchError(res?.data?.message || "Failed to fetch options");
        setOptions([]);
      }
    } catch (error) {
      console.error("Error fetching options:", error);
      setFetchError("Failed to load options. Please try again.");
      setOptions([]);
    }
  }, [getFormOptions, parameterLookup, formik.values, processParameterLookup, checkDependencies]);

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
        return `Select ${dependencies.missing.join(', ')} first`;
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
        className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded border transition-colors duration-200 min-w-[50px]"
        aria-label="Fetch options"
        title={!dependencies.ready ? `Select ${dependencies.missing.join(', ')} first` : 'Fetch options'}
      >
        {isLoading ? "Loading..." : "Fetch"}
      </button>
    </div>
  );
};
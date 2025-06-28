/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from "yup";
import type {
  DynamicFormField,
  ReadProductFieldResponseData,
} from "@/models/request/resourceRequest";

// Create validation schema for a single field
const createFieldValidation = (field: DynamicFormField): Yup.Schema<any> => {
  let validator: Yup.Schema<any>;

  switch (field.fieldInputType) {
    case "number":
      validator = Yup.number()
        .typeError("Must be a valid number")
        .required("This field is required");
      break;
    case "text":
      validator = Yup.string().trim().required("This field is required");
      break;
    case "dropdown":
    default:
      validator = Yup.string().required("Please select an option");
      break;
  }

  return validator;
};

// Create validation schema for nested fields
const createNestedFieldsValidation = (
  fields: DynamicFormField[]
): Yup.Schema<any> => {
  console.log(fields);
  return Yup.array().of(
    Yup.object().shape({
      fieldName: Yup.string().required(),
      fieldInputType: Yup.string().required(),
      selectedOption: Yup.lazy((value, context) => {
        // Get the current field from the context
        const currentField = context.parent as DynamicFormField;
        return createFieldValidation(currentField);
      }),
      nestedFields: Yup.lazy((value, context) => {
        const currentField = context.parent as DynamicFormField;
        if (currentField.nestedFields && currentField.nestedFields.length > 0) {
          return createNestedFieldsValidation(currentField.nestedFields);
        }
        return Yup.array().optional();
      }).optional(),
    })
  );
};

// Main validation schema creator
export const createValidationSchema = (
  backendData: ReadProductFieldResponseData[]
) => {
  return Yup.object().shape({
    nestedFields: createNestedFieldsValidation(
      backendData.map((field) => ({
        fieldName: field.fieldName,
        fieldInputType: field.fieldInputType as "dropdown" | "text" | "number",
        selectedOption: "",
        fieldDropdowns: field.fieldDropdowns,
        nestedFields: [],
      }))
    ).required("At least one field is required"),
  });
};

// Alternative approach: Create validation schema that adapts to current form state
export const createDynamicValidationSchema = (currentFormValues: {
  nestedFields: DynamicFormField[];
}) => {
  const createValidationForFields = (
    fields: DynamicFormField[]
  ): Yup.Schema<any> => {
    console.log(fields);
    return Yup.array().of(
      Yup.object().shape({
        fieldName: Yup.string().required(),
        fieldInputType: Yup.string().required(),
        selectedOption: Yup.mixed().when("fieldInputType", {
          is: "number",
          then: () =>
            Yup.number()
              .typeError("Must be a valid number")
              .required("This field is required"),
          otherwise: () =>
            Yup.mixed().when("fieldInputType", {
              is: "text",
              then: () =>
                Yup.string().trim().required("This field is required"),
              otherwise: () => Yup.string().required("Please select an option"),
            }),
        }),
        nestedFields: Yup.lazy((value) => {
          if (value && Array.isArray(value) && value.length > 0) {
            return createValidationForFields(value);
          }
          return Yup.array().optional();
        }).optional(),
      })
    );
  };

  return Yup.object().shape({
    nestedFields: createValidationForFields(
      currentFormValues.nestedFields
    ).required("At least one field is required"),
  });
};

// Simplified approach that works with your current structure
export const createSimpleValidationSchema = () => {
  const fieldSchema: any = Yup.object().shape({
    fieldName: Yup.string().required(),
    fieldInputType: Yup.string().required(),
    selectedOption: Yup.mixed().when("fieldInputType", {
      is: "number",
      then: () =>
        Yup.number()
          .typeError("Must be a valid number")
          .required("This field is required"),
      otherwise: () =>
        Yup.mixed().when("fieldInputType", {
          is: "text",
          then: () => Yup.string().trim().required("This field is required"),
          otherwise: () => Yup.string().required("Please select an option"),
        }),
    }),
    nestedFields: Yup.lazy(() => Yup.array().of(fieldSchema)).optional(),
  });

  return Yup.object().shape({
    nestedFields: Yup.array().of(fieldSchema).required(),
  });
};

// Usage example for your CreateResource component:
// Replace your current validationSchema with:
// validationSchema: createSimpleValidationSchema(),

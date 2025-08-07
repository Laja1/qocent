import {  object } from 'yup';
import {defaultValidation, improvedCidrValidation,   } from '.';
import * as Yup from "yup";

export const deployModalSchema = object().shape({
    resourceType: defaultValidation('Resource type is required'),
    // resourceSiteCode: defaultValidation('Resource side code is required'),
});

export const resourceModalSchema = object().shape({
  resourceType: defaultValidation('Resource type is required'),
});

export type ParameterData = {
  parameterId: number;
  parameterProvider: string;
  parameterObject: string;
  parameterSerial: string;
  parameterName: string;
  parameterField: string;
  parameterDataType: string;
  parameterInputType: string;
  parameterLookup: string;
  parameterMandatory: string; 
  parameterLabel: string;
  parameterInput: string;
  parameterLength: number;
  parameterValidation: string;
  parameterSource: string;
  parameterInfo1: string;
  parameterInfo2: string;
  parameterInfo3: string;
};


export const generateDynamicSchema = (params?: ParameterData[]) => {
  // Return empty schema if no parameters
  if (!params || !Array.isArray(params)) {
    return Yup.object().shape({});
  }

  const shape: Record<string, Yup.AnySchema> = {};

  params.forEach((param) => {
    if (!param.parameterField || !param.parameterLabel) return;

    let validator: Yup.AnySchema;
    // Fix: parameterMandatory is a string "Yes"/"No", not boolean
    const isRequired = param.parameterMandatory === "Yes";

    // Map your actual input types to validation
    switch (param.parameterInputType) {
      case 'Textbox':
        validator = Yup.string();
        // Apply length validation if specified
        if (param.parameterLength && param.parameterLength > 0) {
          validator = (validator as Yup.StringSchema).max(param.parameterLength, 
            `${param.parameterLabel} must be at most ${param.parameterLength} characters`);
        }
        break;
        case 'NoTrailTextField':
          validator = Yup.string()
            .matches(/^[^\s]+$/, `${param.parameterLabel} must not contain spaces`)
            .trim(); // removes leading/trailing whitespace before validation
        
          if (param.parameterLength && param.parameterLength > 0) {
            validator = (validator as Yup.StringSchema).max(
              param.parameterLength,
              `${param.parameterLabel} must be at most ${param.parameterLength} characters`
            );
          }
          break;
        
      
      case 'CommentBox':
        validator = Yup.string();
        // Apply length validation if specified
        if (param.parameterLength && param.parameterLength > 0) {
          validator = (validator as Yup.StringSchema).max(param.parameterLength, 
            `${param.parameterLabel} must be at most ${param.parameterLength} characters`);
        }
        break;
      
      case 'ListBox':
        validator = Yup.string();
        break;
      
      case 'DateBox':
        validator = Yup.string() // DatePicker likely returns string in your format
          .matches(/^\d{4}-\d{2}-\d{2}$/, `${param.parameterLabel} must be a valid date`);
        break;
      
      case 'NumberBox':
        validator = Yup.number()
          .typeError(`${param.parameterLabel} must be a number`);
        break;
      
      case 'EmailBox':
        validator = Yup.string()
          .email(`${param.parameterLabel} must be a valid email`);
        break;
      
      case 'PasswordBox':
        validator = Yup.string()
          .min(8, `${param.parameterLabel} must be at least 8 characters`);
        break;
        case 'CidrBlock': {
          // Parse any additional validation options from parameterValidation field
          const validationOptions = param.parameterValidation ? 
            JSON.parse(param.parameterValidation) : {};
        
        validator = improvedCidrValidation(param.parameterLabel, {
          requirePrivate: validationOptions.requirePrivate ?? true,
          allowLoopback: validationOptions.allowLoopback ?? false,
          minPrefix: validationOptions.minPrefix ?? 8,
          maxPrefix: validationOptions.maxPrefix ?? 30,
        });
        break;
      }
      default:
        validator = Yup.string(); // Default to string validation
    }

    // Add required validation if needed
    if (isRequired) {
      validator = validator.required(`${param.parameterLabel} is required`);
    }

    // Add parameter to schema shape
    shape[param.parameterField] = validator;
  });

  return Yup.object().shape(shape);
};






  
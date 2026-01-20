import {  object } from 'yup';
import {defaultValidation, improvedCidrValidation, deploymentPasswordValidation,   } from '.';
import * as Yup from "yup";

export const deployModalSchema = object().shape({
    resourceType: defaultValidation('Resource type is required'),
    // resourceSiteCode: defaultValidation('Resource side code is required'),
});

export const resourceModalSchema = object().shape({
  resourceType: defaultValidation('Resource type is required'),
});

export const inviteSiteSchema = object().shape({
  member_identifier: defaultValidation('Account Id is required'),
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
        case 'NoTrailTextField': {
          validator = Yup.string().trim();
          // If regex validation is provided, use it
          if (param.parameterValidation) {
            try {
              // Clean the slashes and build a RegExp object
              const regexString = param.parameterValidation.replace(/^\/|\/$/g, "");
              const regex = new RegExp(regexString);
        
              validator = (validator as Yup.StringSchema).matches(
                regex,
                `${param.parameterLabel} is invalid`
              );
            } catch (err) {
              console.warn(`Invalid regex in parameterValidation: ${param.parameterValidation}`, err);
            }
          } else {
            // Default behavior (only alphanumeric, no spaces/special chars)
            validator = (validator as Yup.StringSchema).matches(
              /^[A-Za-z0-9]+$/,
              `${param.parameterLabel} must only contain letters and numbers (no spaces or special characters)`
            );
          }
        
          if (param.parameterLength && param.parameterLength > 0) {
            validator = (validator as Yup.StringSchema).max(
              param.parameterLength,
              `${param.parameterLabel} must be at most ${param.parameterLength} characters`
            );
          }
          break;
        }
        
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
        validator = deploymentPasswordValidation();
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

export const serverSiteSchema = object().shape({
  siteName:defaultValidation('Account name')
})



export const deploymentModalSchema = object().shape({
  siteCode: Yup.string().required("Site is required"),
  serverPassword: deploymentPasswordValidation(),
});
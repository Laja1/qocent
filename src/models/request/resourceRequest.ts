export type ReadProductFieldResponseData = {
  fieldName: string;
  fieldInputType: string;
  fieldDescription?: string;
  fieldDropdowns: {
    dropdownName: string;
    dropdownValue: string;
    nestedFields?: ReadProductFieldResponseData[];
  }[];
};

export type DynamicFormField = {
  fieldName: string;
  fieldInputType: "dropdown" | "text" | "number";
  fieldDescription?: string;
  selectedOption: string;
  fieldDropdowns?: {
    dropdownName: string;
    dropdownValue: string;
    nestedFields?: ReadProductFieldResponseData[];
  }[];
  nestedFields?: DynamicFormField[];
};

export default function mapBackendToInitialValues(
  fields: ReadProductFieldResponseData[]
): DynamicFormField[] {
  return fields.map((field) => ({
    fieldName: field.fieldName,
    fieldInputType: field.fieldInputType as "dropdown" | "text" | "number",
    selectedOption: "",
    fieldDropdowns: field.fieldDropdowns,
    fieldDescription: field?.fieldDescription,
    nestedFields: [], // Start with empty nested fields
  }));
}


export type createResourceRequest = {
    resourceId: number;
    resourceSite: string;
    resourceType: string;
    resourceName: string;
    resourceProvider: string;
    resourceCode: string;
    resourceContainerType: string;
    resourceContainerCode: string;
    resourceStatus: string;
    resourceDate: string; // ISO date string
    resourceMakerId: string;
    resourceCheckerId: string;
    resourceRef: string;
    resourceTagId: string;
    resourceConfig: {
      service: string;
      region: string;
      clientClass: string;
      requestClass: string;
      operation: string;
      authType: string;
      async: boolean;
      timeout: number;
      customEndpoint: string;
      debugMode: boolean;
      requestBody: {
        vpc: {
          name: string;
          cidr: string;
          description: string;
        };
      };
    };
};


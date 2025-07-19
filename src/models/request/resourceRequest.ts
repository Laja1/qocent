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
  resource: {
    resourceId?: number;
    resourceSite: string;
    resourceType?: string;
    resourceName: string;
    resourceCode: string;
    resourceContainerType?: string;
    resourceContainerCode?: string;
    resourceStatus?: string;
    resourceDate?: string; 
    resourceConfig?: string;
    resourceMaker?: string;
    resourceMakerId?: string;
    resourceUserId?: number;
    resourceCheckerId?: string;
    resourceRef?: string;
    resourceClass?: string;
    resourceLocation?: string;
    resourceTag?: string;
    resourceSize?: string;
    resourceInfo?: string;
  };
  resourceTemplate: {
    service?: string;
    version?: string;
    region?: string;
    clientClass?: string;
    requestClass?: string;
    operation?: string;
    authType?: 'BASIC' | string;
    requestBody: Record<string, string>;
    customHeaders?: Record<string, string>;
    async?: boolean;
    timeout?: number;
    customEndpoint?: string;
    debugMode?: boolean;
  };
};

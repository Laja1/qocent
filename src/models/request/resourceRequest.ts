/* eslint-disable @typescript-eslint/no-explicit-any */
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
    resourceRoomCode:string;
    resourceHouseCode:string;
    resourceType: string;
    resourceName: string;
    resourceProvider: string;
    resourceCode: string;
    resourceContainerType: string;
    resourceContainerCode: string;
    resourceStatus: string;
    resourceDate: string;
    resourceMakerId: string;
    resourceCheckerId: string;
    resourceRef: string;
    resourceTagId: string;
    resourceConfig: Record<any, any>
};


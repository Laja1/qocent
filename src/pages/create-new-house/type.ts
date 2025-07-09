export type HouseParameterItem = {
  ParameterProvider: string;
  ParameterObject: string;
  ParameterSerial: string;
  ParameterName: string;
  ParameterField: string;
  ParameterDataType: "Text" | "Boolean" | "Date" | string;
  ParameterInputType: "Textbox" | "ListBox" | "DateBox" | string;
  ParameterMandatory: "Yes" | "No" | string;
  ParameterLabel: string;
  ParameterInput: "Yes" | "No" | string;
  ParameterLength: string;
  ParameterValidation: string;
  ParameterSource: string;
  ParameterInfo1: string;
  ParameterInfo2: string;
  ParameterInfo3: string;
};
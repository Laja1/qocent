export type ParameterData = {
    ParameterProvider: string;
    ParameterParent: string;
    ParameterSerial: string;
    ParameterName: string;
    ParameterDataType: string;
    ParameterInputType: string;
    ParameterMandatory: string;
    ParameterLabel: string;
    ParameterLength: string;
    ParameterValidation: string;
    ParameterSource: string;
    ParameterInfo1: string;
    ParameterInfo2: string;
    ParameterInfo3: string;
    // Add a field for the actual user input value
    UserValue?: string;
  };
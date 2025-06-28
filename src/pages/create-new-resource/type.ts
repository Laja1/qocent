export type ReadProductFieldResponseData = {
    fieldName: string;
    fieldInputType: string;
    fieldDropdowns: {
      dropdownName: string;
      dropdownValue: string;
      nestedFields?: ReadProductFieldResponseData[];
    }[];
    // other fields ...
  };
  
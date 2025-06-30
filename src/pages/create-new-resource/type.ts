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

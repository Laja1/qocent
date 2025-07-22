export type genericResponse = {
    responseCode: number,
    responseMessage: string
}
  


export type Parameter = {
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

export type ParameterResponse = {
  success: boolean;
  message: string;
  data: Parameter[];
  error: string;
};


export interface SiteData {
  siteId: number;
  siteStatus: string;
  siteCreatedAt: string;
  siteUpdatedAt: string;
  siteAccountId: string;
  siteCode: string;
  siteCurrency: string;
  siteDescription: string;
  siteEOLAction: string;
  siteExpiryDate: string | null;
  siteName: string;
  sitePaymentType: string | null;
  siteProvider: string;
  siteRegion: string;
  siteUserId: number;
}

export interface siteResponse {
  success: boolean;
  data: SiteData[];
  message:string
  error:string
}

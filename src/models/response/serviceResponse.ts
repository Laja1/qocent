export interface service {
    serviceId: number;
    serviceName: string;
    serviceAlias: string;
    serviceCategory: string;
    serviceUrl: string;
    serviceCode: string;
    serviceDescription: string;
    serviceNotice: string;
    serviceProvider: string; // e.g., "aws", "huawei", etc.
  }
  export interface servicePayload {
    serviceName: string;
    serviceAlias: string;
    serviceCategory: string;
    serviceUrl: string;
    serviceCode: string;
    serviceDescription: string;
    serviceNotice: string;
    serviceProvider: string; 
  }
  export interface serviceResponse {
    responseCode: string; // e.g., "00"
    responseMessage: string; // e.g., "Completed successfully"
    data: service[];
  }
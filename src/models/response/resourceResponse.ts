export type resourceType = {
  resourceId: number;
  resourceSite: string;
  resourceType: string;
  resourceName: string;
  resourceCode: string;
  resourceContainerType: string;
  resourceContainerCode: string;
  resourceStatus: string;
  resourceDate: string; // ISO date string
  resourceConfig: string;
  resourceMaker: string;
  resourceMakerId: string;
  resourceUserId: number;
  resourceCheckerId: string;
  resourceRef: string;
  resourceClass: string;
  resourceLocation: string;
  resourceTag: string;
  resourceInfo: string;
};

export type resourceResponse = {
  success: boolean;
  message: string;
  data: resourceType[];
  error: string;
};

export type createResourceResponse = {
  success: boolean;
  message: string;
  data: string;
  error: string;
};


export type formResponse = {
  success: boolean;
  message: string;
  data: {
    label: string;
    value: string;
  }[];
  error: string;
};




export interface Service {
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

export interface serviceResponse {
  responseCode: string; // e.g., "00"
  responseMessage: string; // e.g., "Completed successfully"
  data: Service[];
}




export type getResourceConfigResponse<T> = {
  data: T;
  responseCode: string;
  responseMessage: string;
};

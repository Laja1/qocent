/* eslint-disable @typescript-eslint/no-explicit-any */
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
  responseCode: string,
  responseMessage: string
  data: {
    label: string;
    value: string;
  }[];
 
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



export type getResourceConfigResponse<T> = {
  data: T;
  responseCode: string;
  responseMessage: string;
};


export type ConfigResponse = {
  data: ConfigItem;
  responseCode: string;
  responseMessage: string;
};
 
export type ConfigItem = {
  configId: number;
  configProvider: string;
  configServiceCode: string;
  configStatus: string;
  configJson: {
    resourceSite: string;
    resourceType: string;
    resourceName: string;
    resourceProvider: string;
    resourceInitially: string; // Fixed: was resourceCode, should be resourceInitially
    resourceContainerType: string;
    resourceContainerCode: string;
    resourceStatus: string;
    resourceDate: string; // ISO date string
    resourceMakerId: string;
    resourceCheckerId: string;
    resourceRef: string;
    resourceTagId: string;
    resourceConfig: {
      category: string;
      resource: string;
      action: string;
      body: Record<string, any>; // Fixed: was requestBody, should be body
    };
  };
  configCreatedAt: string;
  configUpdatedAt: string;
  validJson?: boolean; // Made optional since it's not in your sample response
};


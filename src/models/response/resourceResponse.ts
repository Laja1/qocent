/* eslint-disable @typescript-eslint/no-explicit-any */
export type resourceType = {
  resourceId: number;
  resourceCode: string;
  resourceName: string | null;
  resourceType: string;
  resourceStatus: string;
  resourceProvider: string;
  resourceSiteCode: string;
  resourceRoomCode: string;
  resourceHouseCode: string;
  resourceConfig?: string;
  resourceRef?: string | null;
  resourceCreateChannel?: string;
  resourceUserId?: string;
  resourceIP: string;
  resourceCheckerId?: string;
  resourceContainerCode?: string;
  resourceContainerType?: string;
  resourceCreatedAt: string; // e.g. "07/24/2025 10:12:45 AM"
  resourceUpdatedAt?: string; // e.g. "2025-07-24 10:12:45.0"
};

export type resourceResponse = {
  responseCode: string;
  responseMessage: string;
  data: resourceType[];
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



export type consoleSummaryResponse = {
  responseCode: string;
  responseMessage: string;
  data: {
    totalResourceDeployed: number;
    totalSites: number;
    totalHouses: number;
    totalRooms: number;
    trend: {
      date: string;
      value: number;
    }[];
    summary: {
      compute: number;
      networking: number;
      storage: number;
      database: number;
      security: number;
      others: number;
    };
    statusBreakdown: {
      active: number;
      pending: number;
      failed: number;
      inactive: number;
    };
  };
};


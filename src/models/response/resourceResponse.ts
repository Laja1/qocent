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


export type serviceResponse = {
  success: boolean;
  message: string;
  data: {
    label: string;
    value: string;
  }[];
  error: string;
};



export type getResourceConfigResponse = {
  success: boolean;
  data: {
    resourceId: number;
    resourceSite: string;
    resourceType: string;
    resourceName: string;
    resourceProvider: string;
    resourceCode: string;
    resourceContainerType: string;
    resourceContainerCode: string;
    resourceStatus: string;
    resourceDate: string; // ISO date string
    resourceMakerId: string;
    resourceCheckerId: string;
    resourceRef: string;
    resourceTagId: string;
    resourceConfig: {
      service: string;
      region: string;
      clientClass: string;
      requestClass: string;
      operation: string;
      authType: string;
      async: boolean;
      timeout: number;
      customEndpoint: string;
      debugMode: boolean;
      requestBody: {
        vpc: {
          name: string;
          cidr: string;
          description: string;
        };
      };
    };
  };
};

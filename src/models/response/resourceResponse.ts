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


export type formResponse = {
  success: boolean;
  message: string;
  data: {
    label: string;
    value: string;
  }[];
  error: string;
};

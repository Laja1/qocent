/* eslint-disable @typescript-eslint/no-explicit-any */
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
  siteAccountId: string;
  siteBill: number;
  siteCode: string;
  siteCreatedAt: string;
  siteCurrency: string;
  siteDescription: string;
  siteEOLAction: "Suspend" | string; 
  siteExpiryDate: string;
  siteName: string;
  sitePaymentType: "Account" | string;
  siteProvider: "HUAWEI" | "AWS" | string; 
  siteRegion: string;
  siteStatus: "ACTIVE" | "INACTIVE" | string;
  siteUpdatedAt: string;
  siteUserId: string;
}


export interface getSiteAllResponse {
  responseCode: string;
  responseMessage: string;
  data: SiteData[];
}


export interface getSiteArchitectureResponse {
  responseCode: string;
  responseMessage: string;
  data: SiteArchitecture;
}

export interface SiteArchitecture {
  noOfServerHouse: number;
  siteName: string;
  parentId: string;
  parent: string;
  siteCode: string;
  siteDescription: string;
  siteProvider: string;
  siteRegion: string;
  siteStatus: string;
  siteExpiryDate: string;
  siteEOLAction: string;
  serverHouse: ServerHouse[];
  extraResources: {
    resources: ExtraResource[];
  };
}

export interface ServerRoom {
  id: number;
  serverRoom: string;
  serverRoomId: string;
  cidrBlock: string;
  availabilityZone: string;
  resourcesDeployed: any[]; 
  routeTable: string;
  securityGroups: string[];
}

export interface ServerHouse {
  serverHouseId: string;
  houseName: string;
  cidrBlock: string;
  id: number;
  numberOfServerRooms: number;
  serverRoom: ServerRoom[];
}

export interface ExtraResource {
  name: string;
  id: number;
  type: string;
  status: string;
  owner: string;
  resourceCode: string;
  resourceProvider: string;
}

export type SiteResponse = {
  data: {
    siteAccountId: string;
    siteCode: string;
    siteCurrency: string;
    siteDescription: string;
    siteExpiryDate: string;
    siteName: string;
    siteProvider: string;
    siteRegion: string;
    siteUserId: number;
  };
  error: string;
  message: string;
  success: boolean;
};




export interface getResourceSummaryResponse {
  responseCode: string;
  responseMessage: string;
  data: ResourceSummary[];
}

export interface ResourceSummary {
  siteCode: string;
  resourceProvider: string;
  count: number;
  siteName: string;
  resourceType: string;
  groupedResourceType: string;
}


export type resourceDataFlowResponse = {
  connections: {
    x: string;
    y: string;
    serial:string
  }[];
  data: {
    col: number;
    row: number;
    resourceCode: string;
    resourceName: string;
    resourceSiteCode: string;
    resourceType: string;
    errors:number
  }[];
  responseCode: string;
  responseMessage: string;
};

export type resourceProp = {
   resourceUpdatedAt: string;
   resourceBill: number;
   resourceRoomCode: string;
   resourceConfig: string;
   resourceRef: string;
   resourceMakerId: string;
   resourceContainerType: string;
   resourceVpcId: string;
   resourceCreateChannel: string;
   resourceContainerCode: string;
   resourceProviderId: string;
   resourceCheckerId: string;
   resourceDate: string;
   resourceId: number;
   resourceTagId: string;
   resourceCode: string;
   resourceSiteCode: string;
   resourceSiteId: string;
   resourceType: string;
   resourceStatus: string;
   resourceSite: string;
   resourceCreatedAt: string;
   resourceProvider: string;
   resourceSubnetId: string;
   resourceName: string;
   resourceIp: string;
   resourceUserId: string;
  
}

export type getResourcesInSiteResponse = {
  responseCode: string;
  responseMessage: string;
  data: resourceProp[];
};


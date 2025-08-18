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
  parameterEdit:string
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


export interface getSiteResponse {
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



// Individual cell/border definition in the house grid
interface HouseCell {
  row: number;
  col: number;
  top: "Yes" | "No";
  left: "Yes" | "No";
  bottom: "Yes" | "No";
  right: "Yes" | "No";
  color: string; // hex color code like "#e8000b"
  width: number;
  fillColor?: string; 
}

// Resource definition
interface Resource {
  resourceSiteCode: string;
  resourceCode: string;
  resourceName:string
  resourceType:
    | "User"
    | "ServerRoom"
    | "Server"
    | "Database-SQL"
    | "InternetRouter"
    | "HouseRouter"
    | string; // fallback in case new types appear
  row: number;
  col: number;
  errors: number;
}

// Connection between resources
interface Connection {
  resourceSiteCode: string; // e.g., "sample-site-001"
  x: string; // resource code
  y: string; // resource code
  serial: number;
}

// Main data structure
interface ApiResponseData {
  house: HouseCell[];
  resource: Resource[];
  connection: Connection[];
}

// Complete API response
interface resourceDataFlowResponse {
  responseCode: string; // e.g., "00"
  responseMessage: string; // e.g., "Success"
  data: ApiResponseData;
}

// Export the main type
export type { resourceDataFlowResponse, ApiResponseData, HouseCell, Resource, Connection };
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



export type getAccountResponse = {
  responseCode: string;
  responseMessage: string;
  data: AccountData[];
};

export type AccountData = {
  accountId: number;
  accountCode: string;
  accountUserCode: string | null;
  accountName: string;
  accountType: string;
  accountStatus: string;
  accountCreatedAt: string;
  accountUpdatedAt: string | null;
  owner:'YES'|'NO'
};



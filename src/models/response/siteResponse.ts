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
  siteStatus: string;
  siteDescription: string;
  noOfServerHouse: number;
  pendingResourceCount: number;
  siteRegion: string;
  siteExpiryDate: string | null;
  databaseCount: number;
  siteCode: string;
  serverCount: number;
  totalServerRooms: number;
  siteName: string;
  resourceCount: number;
  activeResourceCount: number;
  siteId: number;
  siteProvider: string;
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
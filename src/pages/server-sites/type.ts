/* eslint-disable @typescript-eslint/no-explicit-any */
export type SiteData = {
  id: string;
  resource: string;
  category: string;
  alerts: number;
  parent: string;
  parentId?:string;
  parentType:string
  code: string;
  status: "Active" | "Suspended";
  resourceType: "Database" | "Server" | "API" | "Proxy" | "S3";
  type: "Database" | "Server" | "API" | "Proxy" | "S3";
  createdAt: string;
  bill: number;
};

export type SiteDataProps = {
  Data: SiteData[];
};

export interface summaryType {
  id:string
  resourceType: string
  count:number
}


export interface secutiyAnalysisType {
  id:string
  category: string
  type:string
  recommendation:string
  risk:'Low' | 'Medium' | 'High'
  description:string
}

export type level1CostTableType = {
  id: string;
  type: string;
  [key: string]: any; 
  costs: {
    [month: string]: number; 
  };
};


export interface level2CostTableType {
  type:string
  month:string[]
  
}
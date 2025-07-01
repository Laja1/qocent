export type SiteData = {
  id: string;
  resource: string;
  category: string;
  alerts: number;
  parent: string;
  parentCode:string
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

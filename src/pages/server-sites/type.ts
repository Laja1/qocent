export type SiteData = {
  id: string;
  resource: string;
  cateogry: string;
  alerts: number;
  parent: string;
  parentCode:string
  code: string;
  status: string;
  type: "Database" | "Server";
};

export type SiteDataProps = {
  Data: SiteData[];
};

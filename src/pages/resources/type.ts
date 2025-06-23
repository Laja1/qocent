export interface resourceType {
  resourceId: string;
  resourceName: string;
  provider: string;
  resourceCode: string;
  roomCode:string
  houseCode:string
  siteCode: string;
  createdAt: string;
  type: "Database" | "Server";
  ipRange: string;
}



export type resourceDataProps = {
  resourceData: resourceType[];
};

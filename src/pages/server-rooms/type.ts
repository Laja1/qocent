export interface roomType {
  roomId: string;
  roomName: string;
  provider: string;
  roomCode: string;
  houseCode:string
  siteCode: string;
  createdAt: string;
  type: "Private" | "Public";
  resourcesDeployed: number;
  ipRange: string;
}



export type roomDataProps = {
  roomData: roomType[];
};


export interface houseRoomType {
    houseId: number;
    houseName: string;
    // rooms: string;
    // alerts: number;
    houseProviderId: number;
    houseCode: string;
    houseSiteCode: string;
    houseCreatedAt: string;
    houseCidr: string;
}
  


export type HouseData = {
    houseId: string;
    houseName: string;
    rooms: string;
    alerts: number;
    provider: string;
    siteCode: string;
    houseCode: string;
    status: string;
    createdAt: string; 
    ipRange: string;
  };

export type HouseDataProps = {
   houseData:HouseData[]
}

export interface houseRoomType {
    houseId: string;
    houseName: string;
    rooms: string;
    alerts: number;
    provider: string;
    houseCode: string;
    siteCode: string;
    createdAt: string;
    ipRange: string;
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
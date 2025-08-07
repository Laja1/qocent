export interface HouseItem {
    houseCidr: string;
    houseCode: string;
    houseCreatedAt: string;
    houseId: number;
    houseName: string;
    houseProviderId: number;
    houseRegion: string;
    houseSiteCode: string;
    houseSiteId: string;
    houseStatus: string;
    houseUpdatedAt: string;
    houseUserId: number;
    houseVpcId: string;
  }
  
  export interface getHouseResponse {
    data: HouseItem[];
    responseCode: string;
    responseMessage: string;
  }


export type houseResponse = {
    responseCode: string;
    responseMessage: string;
    data: {
      houseAllowInternet: string;
      houseCheckerId: string;
      houseCidr: string;
      houseCode: string;
      houseCreatedAt: string;
      houseDescription: string;
      houseId: string;
      houseLocation: string;
      houseRef: string;
      houseSite: string;
      houseStatus: string;
      houseUpdatedAt: string;
      houseUserId: string;
    }[];
  };
  
  
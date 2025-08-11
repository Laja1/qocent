export interface HouseItem {
  houseAllowInternet: string;
  houseCheckerId: string;
  houseCidr: string;
  houseCode: string;
  houseName:string
  houseCreatedAt: string;
  houseDescription: string;
  houseId: string;
  houseLocation: string;
  houseRef: string;
  houseSite: string;
  houseStatus: string;
  houseUpdatedAt: string;
  houseUserId: string;
  }
  
  export interface getHouseResponse {
    data: HouseItem[];
    responseCode: string;
    responseMessage: string;
  }


export type houseResponse = {
    responseCode: string;
    responseMessage: string;
    data:HouseItem[];
  };
  
  
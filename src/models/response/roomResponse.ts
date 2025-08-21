export type getAllRoomResponse = {
    responseCode: string;
    responseMessage: string;
    data: roomData[];
  };
  
  export type roomData = {
    roomCheckerId: string;
    roomCode: string;
    roomCreatedAt: string;
    roomDescription: string;
    roomHouse: string;
    roomId: string;
    roomRef: string;
    roomStatus: "ACTIVE" | "INACTIVE"; 
    roomType: string;
    roomUpdatedAt: string;
    roomUserId: string;
    roomName:string;
    roomCidr: string;
  };
  
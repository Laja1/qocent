import { houseData } from "../server-houses/config";
import type { roomType } from "./type";

export const roomData: roomType[] = [];

let roomCounter = 1;

houseData.forEach((house) => {
  const numberOfRooms = parseInt(house.rooms, 10) || 0;

  for (let i = 0; i < numberOfRooms; i++) {
    roomData.push({
      roomId: `R-${roomCounter.toString().padStart(4, "0")}`,
      roomName: house.houseName,
      provider: house.provider,
      siteCode: house.siteCode,
      houseCode: house.houseCode,
      roomCode: `${house.houseCode}-subnet-${i + 1}`,
      type: i % 2 === 0 ? "Private" : "Public",
      createdAt: house.createdAt,
      resourcesDeployed: 5 + ((roomCounter % 4) * 2), 
      ipRange: house.ipRange,
    });

    roomCounter++;
  }
});

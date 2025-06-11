import { serverRooms } from "@/utils/constants/config";
import { useParams } from "react-router-dom";
import type { ServerCardsProps } from "../server-room/server-cards";
import { ResourceList } from "@/components/shared";
import { Header } from "./header";
import { Architecture } from "./architecure";

export const Server = () => {
  const params = useParams();
  const serverRoom = serverRooms.find(
    (serverRoom: ServerCardsProps) => serverRoom.id === params.id
  );

  return (
    <div>
      <div>
        <Header serverRoom={serverRoom as ServerCardsProps} />
        <div className="flex  flex-col w-full">
          <div className="">
            <ResourceList serverRoomId={String(params?.id)} />
          </div>

          <Architecture />
        </div>
      </div>
    </div>
  );
};

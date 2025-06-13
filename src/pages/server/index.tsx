import { serverRooms } from "@/utils/constants/config";
import { useParams } from "react-router-dom";
import type { ServerCardsProps } from "../server-room/server-cards";
import { DataTable } from "@/components/shared";
import { Header } from "./header";
import { Architecture } from "./architecure";

export const Server = () => {
  const params = useParams();
  const serverRoom = serverRooms.find(
    (serverRoom: ServerCardsProps) => serverRoom.id === params.id
  );

  const serverRoomColumns = [
    {
      id: "id",
      header: "ID",
      accessorKey: "id",
      cell: (row) => (
        <span className="font-mono text-right block">{row.resourceName}</span>
      ),
    },
    {
      id: "type",
      header: "TYPE",
      accessorKey: "type",
      cell: (row) => (
        <span className="font-mono text-right block">{row.type}</span>
      ),
    },
    {
      id: "quantity",
      header: "QUANTITY",
      accessorKey: "quantity",
      cell: (row) => (
        <span className="font-mono text-right block">{row.quantity}</span>
      ),
    },
  ];

  return (
    <div>
      <div>
        <Header serverRoom={serverRoom as ServerCardsProps} />
        <div className="flex  flex-col w-full">
          <div className="">
            <DataTable data={serverRooms} columns={serverRoomColumns} />
          </div>

          <Architecture />
        </div>
      </div>
    </div>
  );
};

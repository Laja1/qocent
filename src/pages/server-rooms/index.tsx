import { useState } from "react";
import { imgLinks } from "@/assets/assetLink";
import { Button, Header, type ColumnDef } from "@/components/shared";
import { DataTable } from "@/components/shared/datatable";
import { Badge } from "@/components/ui/badge";
import { Edit, Eye, Trash2, PlusIcon } from "lucide-react";
import { ServerRoomsTab } from "./server-rooms-tab";
import type { roomType } from "./type";
import { roomData } from "./config";

export const ServerRooms = () => {
  const [rowId, setRowId] = useState("1001");

  const serverRoomColumns: ColumnDef<roomType>[] = [
    {
      id: "roomId",
      header: "ROOM ID",
      accessorKey: "roomId",
      cell: (row) => <span className="text-amber-800">{row.roomId}</span>,
      sortable: true,
    },
    {
      id: "roomName",
      header: "ROOM NAME",
      accessorKey: "roomName",
      cell: (row) => <span className="line-clamp-1 ">{row.roomName}</span>,
      sortable: true,
    },
    {
      id: "roomCode",
      header: "ROOM CODE",
      accessorKey: "siteCode",
      cell: (row) => <span className="text-amber-800 line-clamp-1">{row.roomCode}</span>,
      sortable: true,
      filterType: "select",
    },
    {
      id: "houseCode",
      header: "HOUSE CODE",
      accessorKey: "houseCode",
      cell: (row) => <span className="line-clamp-1">{row.houseCode}</span>,
      sortable: true,
      filterType: "select",
    },
    {
      id: "siteCode",
      header: "SITE CODE",
      accessorKey: "siteCode",
      cell: (row) => <span className="text-amber-800 line-clamp-1">{row.siteCode}</span>,
      sortable: true,
      filterType: "select",
    },
    {
      id: "type",
      header: "TYPE",
      accessorKey: "type",
      sortable: true,
      cell: (row) => (
        <Badge
          variant="outline"
          className={`${
            row.type === "Private"
              ? "border-blue-200 bg-blue-50 text-blue-700"
              : "border-amber-200 bg-amber-50 text-amber-700"
          } text-right justify-center flex w-full`}
        >
          {row.type}
        </Badge>
      ),
    },

    {
      id: "provider",
      header: "PROVIDER",
      accessorKey: "provider",
      sortable: true,
      cell: (row) => (
        <span className="text-center justify-center flex">
          {row.provider === "AWS" ? (
            <img src={imgLinks.awsdark} className="size-5" alt="AWS" />
          ) : (
            <img src={imgLinks.huawei} className="size-5" alt="Huawei" />
          )}
        </span>
      ),
    },

    {
      id: "createdAt",
      header: "DATE CREATED",
      headerClassName: "text-right",
      accessorKey: "createdAt",
      sortable: true,
      cell: (row) => <span className="text-right block">{row.createdAt}</span>,
    },
    {
      id: "resourcesDeployed",
      header: "RESOURCES",
      accessorKey: "resourcesDeployed",
      sortable: true,
      cell: (row) => (
        <span className="text-center justify-center flex">
          {row.resourcesDeployed}
        </span>
      ),
    },
    {
      id: "ipRange",
      header: "IP RANGE",
      headerClassName: "text-right",
      accessorKey: "ipRange",
      sortable: true,
      cell: (row) => <span className="text-right block">{row.ipRange}</span>,
    },
  ];

  const actions = [
    {
      label: "View",
      icon: Eye,
      onClick: (row: roomType) => {
        console.log("View server room:", row.roomId);
        // TODO: Implement view functionality
      },
    },
    {
      label: "Edit",
      icon: Edit,
      onClick: (row: roomType) => {
        console.log("Edit server room:", row.roomId);
        // TODO: Implement edit functionality
      },
    },
    {
      label: "Delete",
      icon: Trash2,
      onClick: (row: roomType) => {
        console.log("Delete server room:", row.roomId);
        // TODO: Implement delete confirmation
      },
      variant: "destructive" as const,
    },
  ];

  const room = roomData.find((room) => room.roomId === rowId) as
    | roomType
    | undefined;

  return (
    <div className="">
      <Header title="Server Rooms" description="Manage your server room">
        <Button
          intent="tertiary"
          label="Create New Room"
          prefixIcon={<PlusIcon className="size-4" />}
          size="small"
        />
      </Header>

      <div className="p-5 flex flex-col">
        <DataTable
          data={roomData}
          columns={serverRoomColumns}
          searchPlaceholder="Search server rooms by name, ID, or region..."
          pageSize={5}
          actions={actions}
          onRowClick={(row) => setRowId(row.roomId)}
          getRowId={(row) => row.roomId}
          initialSorting={{ id: "siteName", desc: false }}
        />
      </div>
      <ServerRoomsTab serverRoom={room} />
    </div>
  );
};

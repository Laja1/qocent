import { Button, Header, type ColumnDef } from "@/components/shared";
import { DataTable } from "@/components/shared/datatable";
import { Badge } from "@/components/ui/badge";
import { Edit, Eye, Trash2, PlusIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatDate, getStatusClassName } from "@/utilities/helper";
import { useSelector } from "react-redux";
import { useGetAllRoomQuery } from "@/service/kotlin/roomApi";
import type { RootState } from "@/store";
import type { roomData } from "@/models/response/roomResponse";
import NiceModal from "@ebay/nice-modal-react";
import { ModalConstant } from "@/components/shared/modal/register";
import { Card } from "@/components/ui/card";

export const ServerRooms = () => {
  const navigate = useNavigate();
  const account = useSelector((state: RootState) => state.account);

  const { data, isLoading } = useGetAllRoomQuery(
    {
      accountCode: account?.accountCode,
    },
    {
      skip: !account?.accountCode,
    }
  );
  // const [rowId, setRowId] = useState("R-0001");

  const serverRoomColumns: ColumnDef<roomData>[] = [
    {
      id: "roomId",
      header: "ROOM ID",
      accessorKey: "roomId",
      cell: (row) => <span className="">{row.roomId}</span>,
      sortable: true,
    },
    // {
    //   id: "roomName",
    //   header: "ROOM NAME",
    //   accessorKey: "roomName",
    //   cell: (row) => <span className="line-clamp-1 ">{row.roomName}</span>,
    //   sortable: true,
    // },
    {
      id: "roomCode",
      header: "ROOM CODE",
      accessorKey: "roomCode",
      cell: (row) => <span className=" line-clamp-1">{row.roomCode}</span>,
      sortable: true,
      filterType: "select",
    },
    {
      id: "roomHouse",
      header: "HOUSE CODE",
      accessorKey: "roomHouse",
      cell: (row) => <span className="line-clamp-1">{row.roomHouse}</span>,
      sortable: true,
      filterType: "select",
    },
    // {
    //   id: "siteCode",
    //   header: "SITE CODE",
    //   accessorKey: "siteCode",
    //   cell: (row) => (
    //     <span className="text-amber-800 line-clamp-1">{row.siteCode}</span>
    //   ),
    //   sortable: true,
    //   filterType: "select",
    // },

    // {
    //   id: "provider",
    //   header: "PROVIDER",
    //   accessorKey: "provider",
    //   sortable: true,
    //   cell: (row) => (
    //     <span className="text-center justify-center flex">
    //       {row.provider === "AWS" ? (
    //         <img src={imgLinks.awsdark} className="size-5" alt="AWS" />
    //       ) : (
    //         <img src={imgLinks.huawei} className="size-5" alt="Huawei" />
    //       )}
    //     </span>
    //   ),
    // },
    {
      id: "roomCidr",
      header: "IP RANGE",

      accessorKey: "roomCidr",
      sortable: true,
      cell: (row) => <span className="block">{row.roomCidr}</span>,
    },
    {
      id: "roomStatus",
      header: "Room Status",
      accessorKey: "roomStatus",
      sortable: true,
      cell: (row) => <div className="">
      <Badge
        variant="outline"
        className={getStatusClassName(row.roomStatus  )}
      >
        {row.roomStatus }
      </Badge>
    </div>
    },
    {
      id: "roomType",
      header: "TYPE",
      accessorKey: "roomType",
      headerClassName: "text-center",
      sortable: true,
      cell: (row) => (
        <Badge
          variant="outline"
          className={`${
            row.roomType === "Private"
              ? "border-blue-500 bg-blue-50 text-blue-700"
              : "border-amber-500 bg-amber-50 text-amber-700"
          } text-right justify-center flex w-full`}
        >
          {row.roomType}
        </Badge>
      ),
    },

    {
      id: "roomCreatedAt",
      header: "DATE CREATED",
      headerClassName: "text-right",
      accessorKey: "roomCreatedAt",
      sortable: true,
      cell: (row) => (
        <span className="text-right block">
          {formatDate(row.roomCreatedAt)}
        </span>
      ),
    },
    // {
    //   id: "resourcesDeployed",
    //   header: "RESOURCES",
    //   accessorKey: "resourcesDeployed",
    //   sortable: true,
    //   cell: (row) => (
    //     <span className="text-center justify-center flex">
    //       {row.roomCode}
    //     </span>
    //   ),
    // },
  ];

  const actions = [
    {
      label: "View",
      icon: Eye,
      onClick: (row: roomData) => {
        NiceModal.show(ModalConstant.DrawerModal, row);
      },
    },
    {
      label: "Edit",
      icon: Edit,
      onClick: (row: roomData) => {
        console.log("Edit server room:", row.roomId);
        // TODO: Implement edit functionality
      },
    },
    {
      label: "Delete",
      icon: Trash2,
      onClick: (row: roomData) => {
        console.log("Delete server room:", row.roomId);
        // TODO: Implement delete confirmation
      },
      variant: "destructive" as const,
    },
  ];

  // const room = roomData.find((room) => room.roomId === rowId) as
  //   | roomType
  //   | undefined;

  return (
    <div className="bg-white h-full">
      <Header title="Server Rooms" description="Manage your server room">
        <Button
          intent="tertiary"
          label="Create New Room"
          onClick={() => navigate("/create-new-room")}
          prefixIcon={<PlusIcon className="size-4" />}
          size="small"
        />
      </Header>

      <Card className="mx-5 px-5 mt-5 rounded-sm">
        <DataTable
          data={data?.data || []}
          columns={serverRoomColumns}
          isLoading={isLoading}
          searchPlaceholder="Search server rooms by name, ID, or region..."
          pageSize={5}
          actions={actions}
          // onRowClick={(row) => setRowId(row.roomId)}
          getRowId={(row) => row.roomId}
          initialSorting={{ id: "roomCreatedAt", desc: false }}
        />
      </Card>
      {/* <ServerRoomsTab serverRoom={room} /> */}
    </div>
  );
};

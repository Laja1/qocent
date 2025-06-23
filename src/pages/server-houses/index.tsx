import { imgLinks } from "@/assets/assetLink";
import {
  Button,
  Header,
  type ColumnDef,
} from "@/components/shared";
import { DataTable } from "@/components/shared/datatable";
import { Badge } from "@/components/ui/badge";
import { Edit, Eye, Trash2, PlusIcon } from "lucide-react";
import { useState } from "react";
import type { HouseData, houseRoomType } from "./type";
import { houseData } from "./config";
import { ServerHousesTab } from "./server-houses-tab";

export const ServerHouses = () => {
  const [rowId, setRowId] = useState("1005");

  const serverHouseColumn: ColumnDef<houseRoomType>[] = [
    {
      id: "houseId",
      header: "HOUSE ID",
      accessorKey: "houseId",
      cell: (row) => <span className="text-amber-800">{row.houseId}</span>,
      sortable: true,
    },
    {
      id: "houseName",
      header: "HOUSE NAME",
      accessorKey: "houseName",
      cell: (row) => <span className="line-clamp-1">{row.houseName}</span>,
      sortable: true,
    },
    {
      id: "houseCode",
      header: "HOUSE CODE",
      accessorKey: "houseCode",
      cell: (row) => <span className="text-amber-800 line-clamp-1">{row.houseCode}</span>,
      sortable: true,
      filterType: "select",
      
    },
    {
      id: "alerts",
      header: "ALERTS",
      accessorKey: "alerts",
      sortable: true,
      cell: (row) => (
        <Badge
          variant="outline"
          className={`${
            row.alerts > 0
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-green-200 bg-green-50 text-green-700"
          } text-right justify-center flex w-full`}
        >
          {row.alerts}
        </Badge>
      ),
    },
    {
      id: "rooms",
      header: "ROOMS",
      accessorKey: "rooms",
      sortable: true,
      cell: (row) => (
        <span className="text-center justify-center flex">{row.rooms}</span>
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
      id: "ipRange",
      header: "IP RANGE",
      headerClassName: "text-right",
      accessorKey: "ipRange",
      sortable: true,
      cell: (row) => <span className="text-right block">{row.createdAt}</span>,
    },
     
   
  ];

  const actions = [
    {
      label: "View",
      icon: Eye,
      onClick: (row: houseRoomType) => {
        console.log("View server room:", row.houseId);
        // TODO: Implement view functionality
      },
    },
    {
      label: "Edit",
      icon: Edit,
      onClick: (row: houseRoomType) => {
        console.log("Edit server room:", row.houseId);
        // TODO: Implement edit functionality
      },
    },
    {
      label: "Delete",
      icon: Trash2,
      onClick: (row: houseRoomType) => {
        console.log("Delete server room:", row.houseId);
        // TODO: Implement delete confirmation
      },
      variant: "destructive" as const,
    },
  ];


  const serverHouse = houseData.find((house) => house.houseId === rowId) as HouseData

  return (
    <div className="">
      <Header title="Server Houses" description="Manage your server house">
        <Button
          intent="tertiary"
          label="Create New House"
          prefixIcon={<PlusIcon className="size-4" />}
          size="small"
        />
      </Header>

      <div className="p-5 flex flex-col">
        <DataTable
          data={houseData}
          columns={serverHouseColumn}
          searchPlaceholder="Search server rooms by name, ID, or code..."
          pageSize={5}
          actions={actions}
          onRowClick={(row) => setRowId(row.houseId)}
          getRowId={(row) => row.houseId}
          initialSorting={{ id: "houseName", desc: false }}
        />
      </div>
      <ServerHousesTab serverHouse={serverHouse}/>
    </div>
  );
};

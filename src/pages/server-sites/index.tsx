import { imgLinks } from "@/assets/assetLink";
import {
  Button,
  Header,
  type ColumnDef,
} from "@/components/shared";
import { DataTable } from "@/components/shared/datatable";
import { Badge } from "@/components/ui/badge";
import { serverRooms, type ServerRoomType } from "@/utilities/constants/config";
import { Edit, Eye, Trash2, PlusIcon } from "lucide-react";
import { useState } from "react";
import { ServerSitesTab, type ServerSite } from "./server-sites-tab";

export const ServerSites = () => {
  const [rowId, setRowId] = useState("1005");
  console.log(rowId);

  const serverRoomColumns: ColumnDef<ServerRoomType>[] = [
    {
      id: "siteId",
      header: "SITE ID",
      accessorKey: "siteId",
      cell: (row) => <span className="text-amber-800">{row.siteId}</span>,
      sortable: true,
    },
    {
      id: "siteName",
      header: "SITE NAME",
      accessorKey: "siteName",
      cell: (row) => <span className="line-clamp-1">{row.siteName}</span>,
      sortable: true,
    },
    {
      id: "siteCode",
      header: "SITE CODE",
      accessorKey: "siteCode",
      cell: (row) => <span className="text-amber-800 line-clamp-1">{row.siteCode}</span>,
      sortable: true,
      filterType: "select",
      filterOptions: [
        { label: "US", value: "US" },
        { label: "UK", value: "UK" },
        { label: "France", value: "France" },
        { label: "Germany", value: "Germany" },
        { label: "South Africa", value: "South Africa" },
      ],
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
      id: "houses",
      header: "HOUSES (VPC)",
      accessorKey: "houses",
      sortable: true,
      cell: (row) => (
        <span className="text-center justify-center flex">{row.houses}</span>
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
      id: "status",
      header: "STATUS",
      accessorKey: "status",
      cell: (row) => (
        <div className="">
          <Badge
            variant="outline"
            className={
              row.status === "Active"
                ? "bg-green-50 text-green-700 text-[10px] border-green-200"
                : "bg-red-50 text-red-700 text-[10px] border-red-200"
            }
          >
            {row.status}
          </Badge>
        </div>
      ),
      sortable: true,
      filterType: "select",
      filterOptions: [
        { label: "Active", value: "Active" },
        { label: "Maintenance", value: "Maintenance" },
      ],
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
      id: "bill",
      header: "BILL (USD)",
      accessorKey: "bill",
      headerClassName: "text-right",
      cell: (row) => (
        <span className="block text-green-700 text-right">
          {row.bill.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </span>
      ),
      sortable: true,
    },
    {
      id: "balance",
      header: "BALANCE (USD)",
      headerClassName: "text-right",
      accessorKey: "balance",
      cell: (row) => (
        <span className="block text-right text-green-700">
          {row.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </span>
      ),
      sortable: true,
    },
  ];

  const actions = [
    {
      label: "View",
      icon: Eye,
      onClick: (row: ServerRoomType) => {
        console.log("View server room:", row.siteId);
        // TODO: Implement view functionality
      },
    },
    {
      label: "Edit",
      icon: Edit,
      onClick: (row: ServerRoomType) => {
        console.log("Edit server room:", row.siteId);
        // TODO: Implement edit functionality
      },
    },
    {
      label: "Delete",
      icon: Trash2,
      onClick: (row: ServerRoomType) => {
        console.log("Delete server room:", row.siteId);
        // TODO: Implement delete confirmation
      },
      variant: "destructive" as const,
    },
  ];


  const serverSite = serverRooms.find((site) => site.siteId === rowId) as ServerSite | undefined;

  return (
    <div className="">
      <Header title="Server Sites" description="Manage your server site">
        <Button
          intent="tertiary"
          label="Create New Site"
          prefixIcon={<PlusIcon className="size-4" />}
          size="small"
        />
      </Header>

      <div className="p-5 flex flex-col">
        <DataTable
          data={serverRooms}
          columns={serverRoomColumns}
          searchPlaceholder="Search server rooms by name, ID, or region..."
          pageSize={5}
          actions={actions}
          onRowClick={(row) => setRowId(row.siteId)}
          getRowId={(row) => row.siteId}
          initialSorting={{ id: "siteName", desc: false }}
        />
      </div>
      <ServerSitesTab serverSite={serverSite}/>
    </div>
  );
};

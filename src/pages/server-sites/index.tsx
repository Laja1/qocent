import { imgLinks } from "@/assets/assetLink";
import { Button, Header, Tabs, type ColumnDef } from "@/components/shared";
import { DataTable } from "@/components/shared/datatable";
import { Badge } from "@/components/ui/badge";
import { serverRooms, type ServerRoomType } from "@/utilities/constants/config";
import { Edit, Eye, Trash2, PlusIcon, Plus } from "lucide-react";
import { useState } from "react";
import { ServerSitesTable2 } from "./server-sites-table";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

export const ServerSites = () => {
  const navigate = useNavigate();
  const [rowId, setRowId] = useState("100004");
  const serverRoomColumns: ColumnDef<ServerRoomType>[] = [
    // {
    //   id: "favourite",
    //   header: "",
    //   accessorKey: "favourite",
    //   cell: (row) => (
    //     <span className="hover:cursor-pointer">
    //       <Star key={row.id} size={16} color="green"/>
    //     </span>
    //   ),
    //   sortable: true,
    // },
    {
      id: "id",
      header: "ID",
      accessorKey: "id",
      cell: (row) => <span className="">{row.id}</span>,
      sortable: true,
    },
    {
      id: "siteName",
      header: "SITE NAME",
      accessorKey: "siteName",
      cell: (row) => (
        <span className="line-clamp-1 font-brfirma-bold  text-xs">
          {row.siteName}
        </span>
      ),
      sortable: true,
    },
    {
      id: "siteCode",
      header: "SITE CODE",
      accessorKey: "siteCode",
      cell: (row) => (
        <span className="hover:text-red-500 line-clamp-1">{row.siteCode}</span>
      ),
      sortable: true,
      filterType: "select",
      // filterOptions: [
      //   { label: "US", value: "US" },
      //   { label: "UK", value: "UK" },
      //   { label: "France", value: "France" },
      //   { label: "Germany", value: "Germany" },
      //   { label: "South Africa", value: "South Africa" },
      // ],
    },
    {
      id: "alerts",
      header: "ALERTS",
      accessorKey: "alerts",
      sortable: true,
      cell: (row) => (
        <div className="items-center  flex">
          <div
            className={`${
              row.alerts > 0
                ? "border-red-200 bg-red-800 text-white"
                : "border-green-200 bg-green-800 text-white"
            } text-center justify-center items-center rounded-full inline-flex p-2 w-5 h-5 text-[10px]`}
          >
            {row.alerts}
          </div>
        </div>
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
                ? "bg-green-800 text-white text-[10px] border-green-200"
                : "bg-red-800 text-white text-[10px] border-red-200"
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
        console.log("View server room:", row.id);
        // TODO: Implement view functionality
      },
    },
    {
      label: "Edit",
      icon: Edit,
      onClick: (row: ServerRoomType) => {
        console.log("Edit server room:", row.id);
        // TODO: Implement edit functionality
      },
    },
    {
      label: "Deploy Resource",
      icon: Plus,
      onClick: (row: ServerRoomType) => {
        navigate("/create-resource", { state: row });
        // TODO: Implement view functionality
      },
    },
    {
      label: "Delete",
      icon: Trash2,
      onClick: (row: ServerRoomType) => {
        console.log("Delete server room:", row.id);
        // TODO: Implement delete confirmation
      },
      variant: "destructive" as const,
    },
  ];

  const tabData = [
    {
      id: 1,
      text: "Resources",
      component: (
        <div className="">
          <ServerSitesTable2 rowId={rowId} />
        </div>
      ),
    },
    {
      id: 2,
      text: "Architecture",
      component: <div>This is the Settings tab content.</div>,
    },

    {
      id: 3,
      text: "Security",
      component: <div>This is the Settings tab content.</div>,
    },
    {
      id: 4,
      text: "Cost",
      component: <div>This is the Settings tab content.</div>,
    },
  ];

  return (
    <div className=" h-full mt-5">
      <Header title="Server Sites" description="Manage your server site">
        <Button
          intent="tertiary"
          label="Create New Site"
          prefixIcon={<PlusIcon className="size-4" />}
          size="small"
        />
      </Header>

      <div className="flex gap-4  flex-col overflow-y-auto h-full">
        <Card className="mx-5 px-5 rounded-sm">
          <DataTable
            data={serverRooms}
            columns={serverRoomColumns}
            searchPlaceholder="Search server rooms by name, ID, or region..."
            pageSize={5}
            actions={actions}
            onRowClick={(row) => setRowId(row.id)}
            getRowId={(row) => row.id}
            highlightedRowId={rowId}
            initialSorting={{ id: "siteName", desc: false }}
          />
        </Card>
        <div className="mx-5 mb-10">
          <Tabs tabs={tabData} />
        </div>
      </div>
    </div>
  );
};

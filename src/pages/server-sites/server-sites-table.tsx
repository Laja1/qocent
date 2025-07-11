import { type ColumnDef } from "@/components/shared";
import { DataTable } from "@/components/shared/datatable";
import { Edit, Eye, Trash2 } from "lucide-react";
import type { SiteData } from "./type";
import { siteData } from "./config";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ICON_MAP } from "@/utilities/constants/icons";

export const ServerSitesTable2 = ({ rowId }: { rowId: number }) => {
  const navigate = useNavigate();

  const actions = [
    {
      label: "View",
      icon: Eye,
      onClick: async (row: SiteData) => {
        console.log("View server room:", row.id);
        // TODO: Implement view functionality
      },
    },
    {
      label: "Edit",
      icon: Edit,
      onClick: async (row: SiteData) => {
        console.log("Edit server room:", row.id);
        // TODO: Implement edit functionality
      },
    },
    {
      label: "Delete",
      icon: Trash2,
      onClick: async (row: SiteData) => {
        console.log("Delete server room:", row.id);
        // TODO: Implement delete confirmation
      },
      variant: "destructive" as const,
    },
  ];

  const serverSiteTable2: ColumnDef<SiteData>[] = [
    {
      id: "id",
      header: "ID",
      accessorKey: "id",
      cell: (row) => (
        <span
          onClick={() => navigate("/create-resource")}
          className="hover:cursor-pointer"
        >
          {row.id}
        </span>
      ),
      sortable: true,
    },
    
    {
      id: "resource",
      header: "RESOURCES",
      accessorKey: "resource",
      cell: (row) => <span className="line-clamp-1">{row.resource}</span>,
      sortable: true,
    },
    {
      id: "resourceType",
      header: "",
      accessorKey: "resourceType",
      cell: (row) => (
        <span
          
          className="hover:cursor-pointer"
        >
          {ICON_MAP[row.resourceType as keyof typeof ICON_MAP]}
          
        </span>
      ),
      sortable: true,
    },
    {
      id: "type",
      header: "TYPE",
      accessorKey: "type",
      cell: (row) => (
        <span
          onClick={() => navigate("/resource", { state: row })}
          className="hover:text-red-600 hover:cursor-pointer line-clamp-1"
        >
          {row.type}
        </span>
      ),
      sortable: true,
      filterType: "select",
    },
    
    {
      id: "code",
      header: "CODE",
      accessorKey: "code",
      cell: (row) => <span className=" line-clamp-1">{row.code}</span>,
      sortable: true,
      filterType: "select",
    },
    

    {
      id: "parent",
      header: "PARENT",
      accessorKey: "parent",
      sortable: true,
      cell: (row) => <span className=" flex">{row.parent}</span>,
    },
    {
      id: "parentType",
      header: "PARENT TYPE",
      accessorKey: "parentType",
      sortable: true,
      cell: (row) => <span className=" flex">{row.parentType}</span>,
    },
    {
      id: "alerts",
      header: "ALERTS",
      accessorKey: "alerts",
      sortable: true,
      cell: (row) => (
        <div
        className={`flex items-center justify-center w-5 text-[10px] h-5 rounded-full ${
          row.alerts > 0
            ? "bg-red-50 text-red-800 border border-red-500"
            : "bg-green-50 text-green-800 border border-green-500"
        }`}
      >
        {row.alerts}
      </div>
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
                ? "bg-green-50 text-green-800 border-green-500 text-[10px] "
                : "bg-red-50 text-red-800 border-red-500 text-[10px]"
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
  ];

  const serverSite = siteData.filter((site) => site.parentId === String(rowId));
console.log(rowId)
  return (
   
      <div className="h-full w-full">
       
        <DataTable
          data={serverSite}
          columns={serverSiteTable2}
          showDownload={false}
          showSearch={false}
          actions={actions}
          getRowId={(row) => row.id}
          initialSorting={{ id: "id", desc: false }}
        />
    </div>
  );
};

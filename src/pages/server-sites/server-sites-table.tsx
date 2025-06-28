import { type ColumnDef } from "@/components/shared";
import { DataTable } from "@/components/shared/datatable";
import { serverRooms } from "@/utilities/constants/config";
import { Edit, Eye, Trash2 } from "lucide-react";
import type { SiteData } from "./type";
import { siteData } from "./config";
import { useNavigate } from "react-router-dom";

export const ServerSitesTable2 = ({ rowId }: { rowId: string }) => {
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
      header: "Resource",
      accessorKey: "resource",
      cell: (row) => <span className="line-clamp-1">{row.resource}</span>,
      sortable: true,
    },
    {
      id: "code",
      header: "Code",
      accessorKey: "code",
      cell: (row) => <span className=" line-clamp-1">{row.code}</span>,
      sortable: true,
      filterType: "select",
    },
    {
      id: "type",
      header: "Type",
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
      id: "parent",
      header: "Parent",
      accessorKey: "parent",
      sortable: true,
      cell: (row) => <span className=" flex">{row.parent}</span>,
    },
    {
      id: "parentCode",
      header: "Parent Code",
      accessorKey: "parentCode",
      sortable: true,
      cell: (row) => <span className=" flex">{row.parentCode}</span>,
    },
    {
      id: "alerts",
      header: "ALERTS",
      accessorKey: "alerts",
      sortable: true,

      cell: (row) => (
        <div className=" flex">
          <div
            className={`${
              row.alerts > 0
                ? "border-red-200 bg-red-50 text-red-700"
                : "border-green-200 bg-green-50 text-green-700"
            } text-center justify-center items-center rounded-full inline-flex w-5 h-5 text-[10px]`}
          >
            {row.alerts}
          </div>
        </div>
      ),
    },
  ];

  const serverSite = siteData.filter((site) => site.parentCode === rowId);
  const rowSelected = serverRooms.find((site) => site.siteId === rowId);

  return (
    <div className="bg-white h-full">
      <div className="px-7">
        <div className="shadow-md bg-green-950 h-full p-5 w-full max-w-[800px]">
          <p className="text-white text-left pb-5">{rowSelected?.siteName}</p>
          <DataTable
            data={serverSite}
            columns={serverSiteTable2}
            actions={actions}
            getRowId={(row) => row.id}
            initialSorting={{ id: "id", desc: false }}
          />
        </div>
      </div>
    </div>
  );
};

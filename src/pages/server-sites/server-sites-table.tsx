import { type ColumnDef } from "@/components/shared";
import { DataTable } from "@/components/shared/datatable";
import { Edit, Eye, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ICON_MAP } from "@/utilities/constants/icons";
import type { resourceProp } from "@/models/response/siteResponse";
import { getStatusClassName } from "@/utilities/helper";

export const ServerSitesTable2 = ({
  resourcesInSiteData,
}: {
  resourcesInSiteData: resourceProp[];
}) => {
  const navigate = useNavigate();

  const actions = [
    {
      label: "View",
      icon: Eye,
      onClick: async (row: resourceProp) => {
        console.log("View server room:", row.resourceId);
        // TODO: Implement view functionality
      },
    },
    {
      label: "Edit",
      icon: Edit,
      onClick: async (row: resourceProp) => {
        console.log("Edit server room:", row.resourceId);
        // TODO: Implement edit functionality
      },
    },
    {
      label: "Delete",
      icon: Trash2,
      onClick: async (row: resourceProp) => {
        console.log("Delete server room:", row.resourceId);
        // TODO: Implement delete confirmation
      },
      variant: "destructive" as const,
    },
  ];

  const serverSiteTable2: ColumnDef<resourceProp>[] = [
    {
      id: "resourceId",
      header: "ID",
      accessorKey: "resourceId",
      cell: (row) => (
        <span
          onClick={() => navigate("/create-resource")}
          className="hover:cursor-pointer"
        >
          {row.resourceId}
        </span>
      ),
      sortable: true,
    },

    {
      id: "resourceTypeLabel",
      header: "RESOURCES",
      accessorKey: "resourceType",
      cell: (row) => <span className="line-clamp-1">{row.resourceType}</span>,
      sortable: true,
    },
    {
      id: "resourceTypeIcon",
      header: "",
      accessorKey: "resourceType",
      cell: (row) => (
        <span className="hover:cursor-pointer">
          {ICON_MAP[row.resourceType as keyof typeof ICON_MAP]}
        </span>
      ),
      sortable: true,
    },
    // {
    //   id: "type",
    //   header: "TYPE",
    //   accessorKey: "type",
    //   cell: (row) => (
    //     <span
    //       onClick={() => navigate("/resource", { state: row })}
    //       className="hover:text-red-600 hover:cursor-pointer line-clamp-1"
    //     >
    //       {row.type}
    //     </span>
    //   ),
    //   sortable: true,
    //   filterType: "select",
    // },

    {
      id: "resourceCode",
      header: "CODE",
      accessorKey: "resourceCode",
      cell: (row) => <span className=" line-clamp-1">{row.resourceCode}</span>,
      sortable: true,
      filterType: "select",
    },

    {
      id: "resourceSite",
      header: "PARENT",
      accessorKey: "resourceSite",
      sortable: true,
      cell: (row) => <span className=" flex">{row.resourceSite}</span>,
    },
    // {
    //   id: "parentType",
    //   header: "PARENT TYPE",
    //   accessorKey: "parentType",
    //   sortable: true,
    //   cell: (row) => <span className=" flex">{row.parentType}</span>,
    // },
    // {
    //   id: "alerts",
    //   header: "ALERTS",
    //   accessorKey: "alerts",
    //   sortable: true,
    //   cell: (row) => (
    //     <div
    //     className={`flex items-center justify-center w-5 text-[10px] h-5 rounded-full ${
    //       row.alerts > 0
    //         ? "bg-red-50 text-red-800 border border-red-500"
    //         : "bg-green-50 text-green-800 border border-green-500"
    //     }`}
    //   >
    //     {row.alerts}
    //   </div>
    //   ),
    // },
    {
      id: "resourceStatus",
      header: "STATUS",
      accessorKey: "resourceStatus",
      cell: (row) => (
        <div className="">
          <Badge
            variant="outline"
            className={getStatusClassName(row.resourceStatus)}
          >
            {row.resourceStatus}
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
      id: "resourceCreatedAt",
      header: "DATE CREATED",
      headerClassName: "text-right",
      accessorKey: "resourceCreatedAt",
      sortable: true,
      cell: (row) => (
        <span className="text-right block">{row.resourceCreatedAt}</span>
      ),
    },
    {
      id: "resourceBill",
      header: "BILL (USD)",
      accessorKey: "resourceBill",
      headerClassName: "text-right",
      cell: (row) => (
        <span className="block text-green-700 text-right">
          {row.resourceBill.toLocaleString("en-US", {
            minimumFractionDigits: 2,
          })}
        </span>
      ),
      sortable: true,
    },
  ];

  return (
    <div className="h-full w-full">
      <DataTable
        data={resourcesInSiteData || []}
        columns={serverSiteTable2}
        showDownload={false}
        showSearch={false}
        actions={actions}
        getRowId={(row) => row.resourceId}
        initialSorting={{ id: "id", desc: false }}
      />
    </div>
  );
};

import { type ColumnDef } from "@/components/shared";
import { DataTable } from "@/components/shared/datatable";
import { Edit, Eye, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { getStatusClassName } from "@/utilities/helper";
import type { resourceType } from "@/models/response/resourceResponse";
import { Icon123 } from "@tabler/icons-react";
import NiceModal from "@ebay/nice-modal-react";
import { ModalConstant } from "@/components/shared/modal/register";
import { useResourceMap } from "@/utilities/constants/icons";

export const ResourceTable = ({
  resourcesInSiteData,
  isLoading,
}: {
  resourcesInSiteData: resourceType[];
  isLoading: boolean;
}) => {
  const RESOURCE_MAP = useResourceMap();
  const navigate = useNavigate();

  const actions = [
    {
      label: "View",
      icon: Eye,
      onClick: async (row: resourceType) => {
        console.log("View server room:", row.resourceId);
        // TODO: Implement view functionality
        NiceModal.show(ModalConstant.DrawerModal, row);
      },
    },
    {
      label: "Edit",
      icon: Edit,
      onClick: async (row: resourceType) => {
        console.log("Edit server room:", row.resourceId);
      },
    },
    {
      label: "Delete",
      icon: Trash2,
      onClick: async (row: resourceType) => {
        console.log("Delete server room:", row.resourceId);
        // TODO: Implement delete confirmation
      },
      variant: "destructive" as const,
    },
  ];

  const serverSiteTable2: ColumnDef<resourceType>[] = [
    {
      id: "resourceId",
      header: "ID",
      accessorKey: "resourceId",
      cell: (row) => (
        <span
          onClick={() => navigate("/create-resource")}
          className="hover:cursor-pointer text-gray-900 dark:text-gray-100"
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
      cell: (row) => (
        <span className="line-clamp-1 text-gray-900 dark:text-gray-100">
          {row.resourceType}
        </span>
      ),
      sortable: true,
    },
    {
      id: "resourceTypeIcon",
      header: "",
      accessorKey: "resourceType",
      cell: (row) => {
        const resourceType = row.resourceType;
        const resource =
          RESOURCE_MAP[resourceType as keyof typeof RESOURCE_MAP];

        if (!resource) {
          return <span className="text-gray-400 dark:text-gray-500">?</span>;
        }

        const Icon = resource.icon;

        return (
          <span className={`hover:cursor-pointer`}>
            {/* If it's a normal component */}
            {typeof Icon === "function" ? <Icon123 className="size-5" /> : Icon}
          </span>
        );
      },
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
      cell: (row) => (
        <span className="line-clamp-1 text-gray-900 dark:text-gray-100">
          {row.resourceCode}
        </span>
      ),
      sortable: true,
      filterType: "select",
    },

    {
      id: "resourceSiteCode",
      header: "PARENT",
      accessorKey: "resourceSiteCode",
      sortable: true,
      cell: (row) => (
        <span className="flex text-gray-900 dark:text-gray-100">
          {row.resourceSiteCode}
        </span>
      ),
    },
    // {
    //   id: "resourceSiteCode",
    //   header: "PARENT TYPE",
    //   accessorKey: "resourceSiteCode",
    //   sortable: true,
    //   cell: (row) => <span className=" flex">{row.res}</span>,
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
        { label: "Pending", value: "Pending" },
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
    // {
    //   id: "resourceBill",
    //   header: "BILL (USD)",
    //   accessorKey: "resourceBill",
    //   headerClassName: "text-right",
    //   cell: (row) => (
    //     <span className="block text-green-700 text-right">
    //       {row.resource.toLocaleString("en-US", {
    //         minimumFractionDigits: 2,
    //       })}
    //     </span>
    //   ),
    //   sortable: true,
    // },
  ];

  return (
    <div className="h-full w-full">
      <DataTable
        data={resourcesInSiteData || []}
        columns={serverSiteTable2}
        showDownload={false}
        showSearch={false}
        isLoading={isLoading}
        actions={actions}
        getRowId={(row) => row.resourceId}
        initialSorting={{ id: "id", desc: false }}
      />
    </div>
  );
};

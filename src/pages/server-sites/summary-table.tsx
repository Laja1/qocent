import { DataTable, type ColumnDef } from "@/components/shared/datatable";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RouteConstant } from "@/router/routes";
import type { ResourceSummary } from "@/models/response/siteResponse";

interface SummaryTableProps {
  summaryData: ResourceSummary[];
  isLoading: boolean;
}

export const SummaryTable = ({ summaryData, isLoading }: SummaryTableProps) => {
  const navigate = useNavigate();
  // If you want to highlight by resource type instead:
  const [selectedResourceType, setSelectedResourceType] = useState("");

  const summaryColums: ColumnDef<ResourceSummary>[] = [
    // {
    //   id: "icon",
    //   header: "",
    //   accessorKey: "groupedResourceType",
    //   cell: (row) => (
    //     <span className="hover:cursor-pointer">
    //       {ICON_MAP[row.groupedResourceType as keyof typeof ICON_MAP]}
    //     </span>
    //   ),
    //   sortable: false,
    // },
    {
      id: "resourceTypeLabel",
      header: "Resource Type",
      accessorKey: "groupedResourceType",
      cell: (row) => (
        <span className="line-clamp-1 text-xs py-1 text-gray-900">
          {row.groupedResourceType}
        </span>
      ),
      sortable: false,
    },
    {
      id: "count",
      header: "Count",
      accessorKey: "count",
      cell: (row) => (
        <span className="line-clamp-1 text-xs text-gray-900">
          {row.count}
        </span>
      ),
      sortable: true,
    },
  ];

  const actions = [
    {
      label: `Add resource`,
      icon: Plus,
      onClick: (row: ResourceSummary) => {
        // Navigate with the resource type information if needed
        navigate(RouteConstant.dashboard.createResources.path, {
          state: {
            resourceType: row.resourceType,
            groupedResourceType: row.groupedResourceType,
            sitecode: row.siteCode,
          },
        });
      },
    },
  ];

  return (
    <div className="w-full">
      <DataTable
        data={summaryData}
        columns={summaryColums}
        actions={actions}
        isLoading={isLoading}
        highlightedRowId={selectedResourceType}
        onRowClick={(row) => setSelectedResourceType(row.resourceType)}
        showDownload={false}
        showSearch={false}
        getRowId={(row) => row.resourceType} // Changed to resourcetype for consistency
      />
    </div>
  );
};

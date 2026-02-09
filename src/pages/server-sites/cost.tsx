import { type ColumnDef } from "@/components/shared";
import { DataTable } from "@/components/shared/datatable";
import { Eye } from "lucide-react";
import { useState, useMemo } from "react";
import type { level1CostTableType } from "./type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { allcategories, allMonths, categories } from "./config";
import { CostTabChart } from "./cost-tab-chart";

export const CostTable = () => {
  const [rowId, setRowId] = useState("104");
  const [viewType, setViewType] = useState<"all" | "categories">("all");

  // Get the appropriate data based on view type
  const tableData = useMemo(() => {
    return viewType === "all" ? [allcategories] : categories;
  }, [viewType]);

  // Define columns
  const costTableColumns: ColumnDef<level1CostTableType>[] = useMemo(
    () => [
      {
        id: "id",
        header: "ID",
        accessorKey: "id",
        cell: (row) => (
          <span className="text-gray-900">{row.id}</span>
        ),
        sortable: false,
      },
      {
        id: "type",
        header: "Type",
        accessorKey: "type",
        cell: (row) => (
          <span className="font-medium text-gray-900">
            {row.type}
          </span>
        ),
        sortable: false,
      },
      ...allMonths.map((month) => ({
        id: month,
        header: month,
        accessorKey: month,
        cell: (row: level1CostTableType) => {
          const cost = row.costs[month as keyof typeof row.costs];
          return cost ? (
            <span className="text-gray-900">
              ${cost.toLocaleString()}
            </span>
          ) : (
            <span className="text-gray-500">-</span>
          );
        },
        sortable: false,
      })),
    ],
    []
  );

  const actions = [
    {
      label: "View More",
      icon: Eye,
      onClick: (row: level1CostTableType) => {
        console.log("View cost details:", row.id);
        setRowId(row.id);
      },
    },
  ];

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <h2 className="text-base font-semibold text-gray-900">
          Cost Overview
        </h2>
        <div className="flex items-center space-x-2">
          <Select
            value={viewType}
            onValueChange={(value: "all" | "categories") => setViewType(value)}
          >
            <SelectTrigger className="w-full rounded-xs text-xs h-[8px]">
              <SelectValue placeholder="Select view" />
            </SelectTrigger>
            <SelectContent className="text-xs">
              <SelectItem className="text-xs" value="all">
                All Resources
              </SelectItem>
              <SelectItem className="text-xs" value="categories">
                By Category
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <DataTable
          data={tableData}
          columns={costTableColumns}
          actions={actions}
          onRowClick={(row) => setRowId(row.id)}
          getRowId={(row) => row.id}
          highlightedRowId={rowId}
          showDownload={false}
          filterableColumns={[]} // Disable built-in filtering
          showSearch={false} // Disable search
        />
        <CostTabChart chartDataSource={tableData} />
      </div>
    </div>
  );
};

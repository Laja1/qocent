/* eslint-disable @typescript-eslint/no-explicit-any */
import { Info, Pen } from "lucide-react";
import { type ColumnDef } from "@/components/shared";
import { resourceData } from "./resource-config";
import { DataTable } from "@/components/shared/datatable";

interface ResourceDataProps {
  id: number;
  label: string;
  webServer: string;
  apiServer: string;
  dbServer: string;
}

export const Resource = () => {
  const serverColumns = [
    { id: "webServer" as const, label: "Web Server" },
    { id: "apiServer" as const, label: "API Server" },
    { id: "dbServer" as const, label: "DB Server" },
  ];

  const resourcesColumns: ColumnDef<ResourceDataProps>[] = [
    {
      id: "label",
      header: "Resource Parameters",
      accessorKey: "label",
      cell: (row: ResourceDataProps) => (
        <span className="text-amber-700 dark:text-amber-400 font-medium line-clamp-1">
          {row.label}
        </span>
      ),
      sortable: false,
    },
    ...serverColumns.map((server) => ({
      id: server.id,
      header: server.label,
      accessorKey: server.id,
      cell: (row: ResourceDataProps) => (
        <span className="line-clamp-1 text-gray-900 dark:text-gray-100">
          {row[server.id]}
        </span>
      ),
      sortable: false,
      headerAction: {
        icon: Pen,
        onClick: () => {
          // Handle your edit action here
          console.log(`Edit action for ${server.label}`);
        },
        tooltip: `Edit ${server.label}`,
      },
    })),
  ];

  const actions = [
    {
      label: "Read More",
      icon: Info,
      onClick: (row: ResourceDataProps) => {
        console.log("View server resource:", row.id);
      },
    },

    // {
    //   label: "Delete",
    //   icon: Trash2,
    //   onClick: (row: ResourceDataProps) => {
    //     console.log("Delete server resource:", row.id);
    //   },
    //   variant: "destructive" as const,
    // },
  ];

  return (
    <div className="flex gap-4 flex-col overflow-y-hidden h-full">
      <DataTable<ResourceDataProps>
        data={resourceData}
        columns={resourcesColumns}
        actions={actions}
        showDownload={false}
        showSearch={false}
        searchPlaceholder="Search resources by name, type, or server..."
        onRowClick={(row) => console.log("Row Clicked:", row.id)}
        initialSorting={{ id: "label", desc: false }}
      />
    </div>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import {  PlusIcon, Info } from "lucide-react";
import { Button, Header, type ColumnDef } from "@/components/shared";
import { useLocation } from "react-router-dom";
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
  const location = useLocation();
  const row = location.state;
  console.log("Selected Row:", row);

  const serverColumns = [
    { id: "webServer" as const, label: "Web Server" },
    { id: "apiServer" as const, label: "API Server" },
    { id: "dbServer" as const, label: "DB Server" },
  ];

  const resourcesColumns: ColumnDef<ResourceDataProps>[] = [
    {
      id: "label",
      header: "Resource Paramaters",
      accessorKey: "label",
      cell: (row: ResourceDataProps) => (
        <span className="text-amber-800 font-medium line-clamp-1">
          {row.label}
        </span>
      ),
      sortable: false,
    },
    // Dynamically create columns for each server
    ...serverColumns.map((server) => ({
      id: server.id,
      header: server.label,
      accessorKey: server.id,
      cell: (row: ResourceDataProps) => (
        <span className="line-clamp-1">{row[server.id]}</span>
      ),
      sortable: false,
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
    <div className=" h-full">
      <Header title={row?.parent} description={row?.category}>
        <Button
          intent="tertiary"
          label={`Create New ${row?.category}`}
          prefixIcon={<PlusIcon className="size-4" />}
          size="small"
        />
      </Header>

      <div className=" mt-2 flex gap-4 flex-col overflow-y-auto h-full">
        <DataTable<ResourceDataProps>
          data={resourceData}
          columns={resourcesColumns}
          actions={actions}
          searchPlaceholder="Search resources by name, type, or server..."
          onRowClick={(row) => console.log("Row Clicked:", row.id)}
          initialSorting={{ id: "label", desc: false }}
        />
      </div>
    </div>
  );
};